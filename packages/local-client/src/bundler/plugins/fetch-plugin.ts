import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'fileCache'
})

const fetchPlugin = (inputCode: string) => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild){
          build.onLoad({ filter: /^index\.js$/ }, (args: any) => {
            return {
                loader: 'jsx',
                contents: inputCode
              }
          })

          build.onLoad({ filter: /.*/ }, async (args: any) => {
            //Caching: Any onLoad that does not return anything will lead to the calling of the next onLoad until the data is returned. If none of the onLoads return anything, error is thrown.
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

            if(cachedResult){
              return cachedResult;
            }
          })

          build.onLoad({ filter: /.css$/ }, async (args: any) => {
            const {data, request} = await axios.get(args.path);

            const escapedCss = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
            const contents = `
                const style = document.createElement('style');
                style.innerText = '${escapedCss}';
                document.head.appendChild(style);
            `;

            const result: esbuild.OnLoadResult = {
              loader: 'css',
              contents,
              resolveDir: new URL('./', request.responseURL).pathname
            }

            fileCache.setItem(args.path, result);

            return result;
          })

          build.onLoad({ filter: /.*/ }, async (args: any) => {
            const {data, request} = await axios.get(args.path);

            const result: esbuild.OnLoadResult = {
              loader: 'jsx',
              contents: data,
              resolveDir: new URL('./', request.responseURL).pathname
            }

            fileCache.setItem(args.path, result);

            return result;
            
          })
        }
    }
}

export default fetchPlugin;
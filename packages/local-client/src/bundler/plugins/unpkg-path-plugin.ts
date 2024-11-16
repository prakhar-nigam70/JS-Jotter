import * as esbuild from 'esbuild-wasm';


const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild){
          //Resolve path for main file index.js
          build.onResolve({ filter: /^index\.js$/ }, (args: any) => {
            return {
              path: 'index.js',
              namespace: 'a',
            }
          })

          //Resolve path for relative paths including ./ and ../
          build.onResolve({ filter: /^\.+\// }, (args: any) => {
            let url = new URL(args.path, 'https://unpkg.com' + args.resolveDir +'/')
            return {
              path: url.href,
              namespace: 'a',
            }
          })

          build.onResolve({ filter: /.*/ }, async (args: any) => {
              return {
                path: `https://unpkg.com/${args.path}`,
                namespace: 'a'
              }
          })
        }
    }
}

export default unpkgPathPlugin;
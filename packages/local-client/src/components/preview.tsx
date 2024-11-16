import "./preview.css";
import React, { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
    <head></head>
    <body>
        <div id="root"></div>
        <script>
            const handleError = (error) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4>' + error + '</div>';
                console.error(error);
            }

            window.addEventListener('error', (event) => {
                handleError(event.error);
            })

            window.addEventListener('message', (event) => {
                try{
                    eval(event.data);
                }catch(error){
                    handleError(error);
                }
            }, false);
        </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    //for resetting the contents of iframe, we can manually set it to any value using srcdoc attribute.
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;

import React, { useEffect, useRef } from "react";
import "./Preview.css";

interface PreviewProps {
  code: string;
  error: string;
}

const initialHTMLDoc = `
<html>
  <head>
    <style>
      html {
        background-color: #fff
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.getElementById('root');
        root.innerHTML = '<div  style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      })

      window.addEventListener('message', (event) => {
        try {
          eval(event.data)
        } catch(err) {
          handleError(err)
        }
      })
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }
    //refresh iframe with initial document
    iframeRef.current.srcdoc = initialHTMLDoc;

    //update the code
    setTimeout(() => {
      if (!iframeRef.current) {
        return;
      }
      iframeRef.current.contentWindow?.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <div className="preview-container h-full relative flex-grow overflow-hidden">
      <div className="bg-slate-100 text-sm py-1 px-4 m-1 mx-0 font-mono text-gray-500 rounded max-h-[32px]">
        http://localhost:myapp
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={initialHTMLDoc}
        title="codeOutput"
        sandbox="allow-scripts"
        width={"100%"}
        className="h-[calc(100%-32px)]"
      ></iframe>
      {error && (
        <div className="absolute top-3 left-3 text-red-500">{error}</div>
      )}
    </div>
  );
};

export default Preview;

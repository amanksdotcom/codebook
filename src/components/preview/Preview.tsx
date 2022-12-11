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
    <div className="preview-container h-full relative flex-grow  border-vs-dark">
      <iframe
        ref={iframeRef}
        srcDoc={initialHTMLDoc}
        title="codeOutput"
        sandbox="allow-scripts"
        height={"100%"}
        width={"100%"}
      ></iframe>
      {error && (
        <div className="absolute top-3 left-3 text-red-500">{error}</div>
      )}
    </div>
  );
};

export default Preview;

import { useState } from "react";
import CodeCell from "./components/code-cell/CodeCell";
import CodeEditor from "./components/code-editor/CodeEditor";

function App() {
  return (
    <div className="container mx-auto">
      <CodeCell cell={{ content: "//Code" }} />
      <br />
      <CodeCell cell={{ content: "//Code" }} />
    </div>
  );
}

export default App;

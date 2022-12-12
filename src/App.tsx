import { useState } from "react";
import CellList from "./components/cell-list/CellList";
import CodeCell from "./components/code-cell/CodeCell";
import CodeEditor from "./components/code-editor/CodeEditor";
import Notebook from "./views/notebook";

function App() {
  return (
    <div>
      <Notebook />
    </div>
  );
}

export default App;

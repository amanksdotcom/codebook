import { useState } from "react";
import CellList from "./components/cell-list/CellList";
import CodeCell from "./components/code-cell/CodeCell";
import CodeEditor from "./components/code-editor/CodeEditor";

function App() {
  return (
    <div className="container mx-auto">
      <CellList />
    </div>
  );
}

export default App;

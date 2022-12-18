import React, { useState } from "react";
import { CellList } from "../../components/cell-list";
import { Container } from "../../components/container";
import { Header } from "./Header";

const Notebook = () => {
  const [notebookTitle, setNotebookTitle] = useState("Untitled");

  return (
    <div>
      <Header
        notebookTitle={notebookTitle}
        setNotebookTitle={setNotebookTitle}
      />
      <Container id="notebook-content" className="overflow-y-auto">
        <div className="container mx-auto">
          <CellList />
        </div>
      </Container>
    </div>
  );
};

export default Notebook;

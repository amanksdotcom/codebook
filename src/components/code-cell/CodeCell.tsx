import { useEffect, useState } from "react";
import esbuilder from "../../services/bundler";
import { useTypedSelector, useTypedDispatch } from "../../hooks/useTypedRedux";
// import { Cell } from "../../state";
import CodeEditor from "../code-editor/CodeEditor";
import Preview from "../preview/Preview";
import Resizable from "../resizable/Resizable";
// import styles from "./CodeCell.module.css";

interface CodeCellProps {
  cell: any;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const { updateCell, createBundle } = useActions();
  // const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  // useEffect(() => {
  //   const showFunc = `
  //   import React from 'react';
  //   import ReactDOM from 'react-dom/client';
  //   const show = (value) => {
  //     const rootEl = document.querySelector('#root');
  //     if(typeof value === 'object') {
  //       if(value.$$typeof && value.props) {
  //         ReactDOM.createRoot(rootEl).render(value, root);
  //       }
  //       rootEl.innerHTML = JSON.stringify(value);
  //     } else {
  //       rootEl.innerHTML = value;
  //     }
  //   };
  //   `;
  //   if (!bundle) {
  //     createBundle(cell.id, showFunc + cell.content);
  //     return;
  //   }
  //   const timer = setTimeout(async () => {
  //     createBundle(cell.id, showFunc + cell.content);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [cell.content, cell.id, createBundle]);

  return (
    <div className="p-4 bg-slate-500">
      <Resizable direction="vertical">
        <div className="flex h-[calc(100%-10px)] bg-vs-dark">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue={cell.content}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </Resizable>
          {false ? (
            <div>Loading...</div>
          ) : (
            <Preview code={"console.logg(12)"} error={""} />
          )}
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;

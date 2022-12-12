import { useEffect, useState } from "react";
import esbuilder from "../../services/bundler";
import { useTypedSelector, useTypedDispatch } from "../../hooks/useTypedRedux";
import { bundleActions, Cell, cellActions } from "../../store";
import CodeEditor from "../code-editor/CodeEditor";
import Preview from "../preview/Preview";
import Resizable from "../resizable/Resizable";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { createBundle } = bundleActions;
  const dispatch = useTypedDispatch();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    const showFunc = `
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    const show = (value) => {
      const rootEl = document.querySelector('#root');
      if(typeof value === 'object') {
        if(value.$$typeof && value.props) {
          ReactDOM.createRoot(rootEl).render(value, root);
        }
        rootEl.innerHTML = JSON.stringify(value);
      } else {
        rootEl.innerHTML = value;
      }
    };
    `;
    if (!bundle) {
      dispatch(
        createBundle({ cellId: cell.id, input: showFunc + cell.content })
      );
      return;
    }
    const timer = setTimeout(async () => {
      dispatch(
        createBundle({ cellId: cell.id, input: showFunc + cell.content })
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

  return (
    <div className="p-1 mt-4 bg-vs-dark rounded-lg">
      <Resizable direction="vertical">
        <div className="flex h-[calc(100%-10px)] bg-vs-dark">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue={cell.content}
              onChange={(value) => {
                dispatch(
                  cellActions.updateCell({ content: value, id: cell.id })
                );
              }}
            />
          </Resizable>
          {!bundle || bundle.loading ? (
            <div>Loading...</div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;

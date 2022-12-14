import { useEffect, useState } from "react";
import esbuilder from "../../services/bundler";
import { useTypedSelector, useTypedDispatch } from "../../hooks/useTypedRedux";
import { bundleActions, cellActions } from "../../store";
import { ICell } from "../../types";
import { Resizable } from "../resizable";
import { CodeEditor } from "../code-editor";
import { Preview } from "../preview";
import { Spinner } from "../Spinner";
interface CodeCellProps {
  cell: ICell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { createBundle } = bundleActions;
  const dispatch = useTypedDispatch();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    const showFunc = `
    const show = (value) => {
      const rootEl = document.querySelector('#root');
      if(typeof value === 'object') {
        if(value.$$typeof && value.props) {
          ReactDOM.createRoot(rootEl).render(value, root);
          return;
        }
        rootEl.innerHTML = JSON.stringify(value);
      } else {
        rootEl.innerHTML = value;
      }
    };
    const renderReact = (component) => {
      // const {default: React} = await import('react');
      // const {default: ReactDOM} = await import('react-dom/client');
      // const rootEl = document.querySelector('#root');
      // ReactDOM.createRoot(rootEl).render(component);
      import('react').then(({default: React})=>{
        import('react-dom/client').then(({default: ReactDOM})=>{
          const rootEl = document.querySelector('#root');
          ReactDOM.createRoot(rootEl).render(component);
        })
      })
    }
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
    <div className="p-1  bg-vs-dark rounded-lg">
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
            <div className="bg-white h-full w-full grid place-items-center">
              <Spinner />
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </Resizable>
    </div>
  );
};

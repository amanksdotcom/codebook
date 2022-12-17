import React from "react";
import { ICell } from "../../types";
import ActionBar from "../action-bar/ActionBar";
import { CodeCell } from "../code-cell";
import { MarkdownEditor } from "../md-editor";


interface CellProps {
  cell: ICell;
}

export const Cell: React.FC<CellProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = <CodeCell cell={cell} />;
  } else {
    child = <MarkdownEditor cell={cell} />;
  }
  return (
    <div className="relative group my-6">
      <ActionBar id={cell.id} cellType={cell.type} />
      {child}
    </div>
  );
};

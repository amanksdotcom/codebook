import React from "react";
import { Cell } from "../../store";
import ActionBar from "../action-bar/ActionBar";
import CodeCell from "../code-cell/CodeCell";
import MarkdownEditor from "../md-editor/MDEditor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = <CodeCell cell={cell} />;
  } else {
    child = <MarkdownEditor cell={cell} />;
  }
  return (
    <div className="relative overflow-hidden group">
      <ActionBar id={cell.id} cellType={cell.type} />
      {child}
    </div>
  );
};

export default CellListItem;

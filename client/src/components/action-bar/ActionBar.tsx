import React from "react";
import { useTypedDispatch } from "../../hooks/useTypedRedux";
import { cellActions } from "../../store";
import { CellTypes } from "../../types";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { ActionButton } from "./ActionButton";
import { BiCodeAlt } from "react-icons/bi";
import { BsMarkdown } from "react-icons/bs";

interface ActionBarProps {
  id: string;
  cellType: CellTypes;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, cellType }) => {
  const { moveCell, deleteCell, insertCellAfter } = cellActions;
  const dispatch = useTypedDispatch();

  const insertCell = (type: CellTypes) => {
    dispatch(insertCellAfter({ id, type }));
  };

  return (
    <div
      id="action-bar"
      className={`hidden group-hover:flex group-focus:flex items-center gap-2 justify-end absolute top-0 right-2 z-10 h-full max-h-[40px] ${
        cellType === "code" &&
        "bg-vs-dark rounded-2xl text-white px-2 -top-4 -right-4"
      }`}
    >
      <ActionButton
        cellType={cellType}
        onClick={() => dispatch(moveCell({ id, direction: "up" }))}
        options={{ title: "Move Cell Up" }}
      >
        <BsArrowUp />
      </ActionButton>

      <ActionButton
        cellType={cellType}
        onClick={() => dispatch(moveCell({ id, direction: "down" }))}
        options={{ title: "Move Cell Down" }}
      >
        <BsArrowDown />
      </ActionButton>
      <ActionButton
        cellType={cellType}
        onClick={() => insertCell("code")}
        options={{ title: "Add Code Cell Below" }}
      >
        <BiCodeAlt />
      </ActionButton>
      <ActionButton
        cellType={cellType}
        onClick={() => insertCell("text")}
        options={{ title: "Add Markdown Cell Below" }}
      >
        <BsMarkdown />
      </ActionButton>
      <ActionButton
        cellType={cellType}
        onClick={() => dispatch(deleteCell(id))}
        options={{ title: "Delete Cell" }}
      >
        <MdDelete />
      </ActionButton>
    </div>
  );
};

export default ActionBar;

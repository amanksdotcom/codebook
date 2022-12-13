import React from "react";
import { useTypedDispatch } from "../../hooks/useTypedRedux";
import { cellActions, CellTypes } from "../../store";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { ActionButton } from "./ActionButton";

interface ActionBarProps {
  id: string;
  cellType: CellTypes;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, cellType }) => {
  const { moveCell, deleteCell } = cellActions;
  const dispatch = useTypedDispatch();

  return (
    <div
      id="action-bar"
      className={`hidden group-hover:flex group-focus:flex items-center gap-2 justify-end absolute top-0 right-2 z-10 h-full max-h-[40px] ${
        cellType === "code" && "bg-vs-dark rounded-2xl text-white px-2"
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
        onClick={() => dispatch(deleteCell(id))}
        options={{ title: "Delete Cell" }}
      >
        <MdDelete />
      </ActionButton>
    </div>
  );
};

export default ActionBar;

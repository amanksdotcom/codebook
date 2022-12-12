import React from "react";
import { useTypedDispatch } from "../hooks/useTypedRedux";
import { cellActions } from "../store";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = cellActions;
  const dispatch = useTypedDispatch();

  return (
    <div className="flex items-center gap-2 justify-end absolute top-0 right-2 z-10 h-full max-h-[40px]">
      <button
        onClick={() => dispatch(moveCell({ id, direction: "up" }))}
        className="hover:bg-gray-200 p-2"
      >
        <BsArrowUp />
      </button>

      <button
        className="hover:bg-gray-200 p-2"
        onClick={() => dispatch(moveCell({ id, direction: "down" }))}
      >
        <BsArrowDown />
      </button>
      <button
        className="hover:bg-gray-200 p-2"
        onClick={() => dispatch(deleteCell(id))}
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default ActionBar;

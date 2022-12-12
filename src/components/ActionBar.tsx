import React from "react";
import { useTypedDispatch } from "../hooks/useTypedRedux";
import { cellActions } from "../store";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = cellActions;
  const dispatch = useTypedDispatch();

  return (
    <div className="flex gap-2 justify-end">
      <button
        className="border px-4"
        onClick={() => dispatch(moveCell({ id, direction: "up" }))}
      >
        Up
      </button>
      <button
        className="border px-4"
        onClick={() => dispatch(moveCell({ id, direction: "down" }))}
      >
        Down
      </button>
      <button className="border px-4" onClick={() => dispatch(deleteCell(id))}>
        Delete
      </button>
    </div>
  );
};

export default ActionBar;

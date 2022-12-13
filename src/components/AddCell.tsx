import React from "react";
import { useTypedDispatch } from "../hooks/useTypedRedux";
import { cellActions, CellTypes } from "../store";
interface AddCellProps {
  prevCellId: string | null;
}
const AddCell: React.FC<AddCellProps> = ({ prevCellId }) => {
  const { insertCellAfter } = cellActions;
  const dispatch = useTypedDispatch();
  const insertCell = (type: CellTypes) => {
    dispatch(insertCellAfter({ id: prevCellId, type }));
  };
  return (
    <div id="add-cell" className="flex gap-2">
      <button onClick={() => insertCell("text")}>Text</button>
      <button onClick={() => insertCell("code")}>Code</button>
    </div>
  );
};

export default AddCell;

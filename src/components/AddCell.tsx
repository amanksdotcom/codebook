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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "4rem",
        margin: "8px 0",
      }}
    >
      <button onClick={() => insertCell("text")}>Text</button>
      <button onClick={() => insertCell("code")}>Code</button>
    </div>
  );
};

export default AddCell;

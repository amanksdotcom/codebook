import React from "react";
import { useTypedDispatch } from "../hooks/useTypedRedux";
import { cellActions } from "../store";
import { CellTypes } from "../types";
import { BiCodeAlt } from "react-icons/bi";
import { BsMarkdown } from "react-icons/bs";
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
    <div id="add-cell" className="flex gap-4 text-sm">
      <button
        onClick={() => insertCell("text")}
        title="Add Markdown Cell at top"
        className="flex items-center gap-1 bg-purple-400 text-white px-4 py-2 rounded"
      >
        Add <BsMarkdown size={20} />
      </button>
      <button
        onClick={() => insertCell("code")}
        title="Add Code Cell at top"
        className="flex items-center gap-1 bg-blue-400 text-white px-4 py-2 rounded"
      >
        Add <BiCodeAlt size={20} />
        {/* <AiOutlineCode size={20}/> */}
      </button>
    </div>
  );
};

export default AddCell;

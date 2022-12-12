import { Fragment, useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/useTypedRedux";
import { cellActions } from "../../store";
import AddCell from "../AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    return state.cells.order.map((id) => state.cells.data[id]);
  });
  const data = useTypedSelector((state) => state.cells.order);
  const dispatch = useTypedDispatch();
  const { initNotebook } = cellActions;

  useEffect(() => {
    dispatch(initNotebook());
  }, []);

  return (
    <div className="bg-white pl-8 pr-3 py-4">
      {cells.map((cell) => (
        <CellListItem key={cell.id} cell={cell} />
      ))}
    </div>
  );
};

export default CellList;

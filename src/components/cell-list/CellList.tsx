import { Fragment } from "react";
import { useTypedSelector } from "../../hooks/useTypedRedux";
import AddCell from "../AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    return state.cells.order.map((id) => state.cells.data[id]);
  });
  return (
    <div>
      <AddCell prevCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem key={cell.id} cell={cell} />
          <AddCell prevCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;

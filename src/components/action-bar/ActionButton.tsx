import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { CellTypes } from "../../store";

interface ActionButtonProps {
  onClick: () => void;
  cellType: CellTypes;
  children?: React.ReactNode;
  className?: string;
  options?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}
export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  cellType,
  children,
  className,
  options,
}) => {
  return (
    <button
      {...options}
      className={`${
        cellType === "code" ? "hover:bg-slate-800" : "hover:bg-gray-200"
      } p-2 border-inherit ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

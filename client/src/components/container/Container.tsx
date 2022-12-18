import React, { ReactNode } from "react";

export interface IContainerProps {
  id?: string;
  className?: string;
  children?: ReactNode;
}

export const Container: React.FC<IContainerProps> = ({
  id = "",
  className = "",
  children,
}) => {
  return (
    <section
      id={id}
      className={`bg-gray-100 min-h-[calc(100vh-70px)] max-h-[calc(100vh-70px)] py-6 ${className}`}
    >
      {children}
    </section>
  );
};

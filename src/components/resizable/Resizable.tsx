import React, { useEffect, useState } from "react";
import "./Resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const { innerHeight, innerWidth } = useWindowDimensions();
  const [width, setWidth] = useState(window.innerWidth * 0.50);

  useEffect(() => {
    if (width > innerWidth * 0.75) {
      setWidth(innerWidth * 0.75);
    }
  }, [innerWidth, width]);

  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop(e, data) {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 48],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;

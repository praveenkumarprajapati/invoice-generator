import React from "react";

type TooltipProps = {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  theme?: "light" | "dark";
  width?: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="tooltip" data-tip={text}>
      {children}
    </div>
  );
};

export default Tooltip;

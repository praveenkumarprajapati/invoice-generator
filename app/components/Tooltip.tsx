"use client";
import React, { useState } from "react";
import clsx from "clsx";

type TooltipProps = {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  theme?: "light" | "dark";
  width?: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ text, position = "top", theme = "dark", width = "", children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div
          className={clsx(
            "absolute w-md text-center z-50 p-2 rounded shadow-lg transition-opacity duration-200",
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900 border border-gray-300",
            width,
            {
              "bottom-full left-1/2 transform -translate-x-1/2 mb-2": position === "top",
              "top-full left-1/2 transform -translate-x-1/2 mt-2": position === "bottom",
              "right-full top-1/2 transform -translate-y-1/2 mr-2": position === "left",
              "left-full top-1/2 transform -translate-y-1/2 ml-2": position === "right",
            }
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

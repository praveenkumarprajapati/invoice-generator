"use client";

import clsx from "clsx";
import React from "react";

type Props = {
  type: "text" | "number";
  onChange: (value: string) => void;
  value?: string | number;
  name?: string;
  placeholder?: string;
  className?: string;
};

export const Input: React.FC<Props> = ({ type, onChange, name, value, placeholder, className }) => {
  return (
    <div className={clsx("relative my-3 w-full", className)}>
      {placeholder && (
        <label
          htmlFor={name} // Ensures clicking the label focuses the input
          className={clsx(
            "absolute left-3 px-1 bg-white transition-all cursor-text", // cursor-text for better UX
            "-top-2 text-sm text-blue-600"
          )}
        >
          {placeholder}
        </label>
      )}

      {/* Input Field */}
      <input
        id={name} // Links the label to the input
        name={name}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        className="w-full p-2 pt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

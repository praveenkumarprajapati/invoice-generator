"use client";

import clsx from "clsx";
import React from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value, placeholder }) => {
  return (
    <div className="relative my-3 w-full">
      {/* Floating Placeholder (Now Clickable) */}
      {placeholder && (
        <label className={clsx("absolute left-3 px-1 bg-white transition-all cursor-text", "-top-2 text-sm text-blue-600")}>{placeholder}</label>
      )}

      {/* Select Dropdown */}
      <select
        className="w-full p-2 pt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

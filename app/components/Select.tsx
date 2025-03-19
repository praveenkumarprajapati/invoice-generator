import React from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <div className="floating-label mt-3 w-full">
      {/* Floating Placeholder (Now Clickable) */}
      <span>{placeholder}</span>
      {/* Select Dropdown */}
      <select
        className="w-full p-2 pb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
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

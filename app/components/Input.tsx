"use client";

import React from "react";

type Props = {
  type: "text" | "number";
  onChange: (value: string) => void;
  value?: string;
  name?: string;
  placeholder?: string;
  label?: string;
};

export const Input: React.FC<Props> = ({ type, onChange, name, placeholder, value, label }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

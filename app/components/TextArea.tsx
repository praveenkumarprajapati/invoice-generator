"use client";
import React, { useEffect, useRef } from "react";

interface TextAreaProps {
  onChange: (value: string) => void;
  value?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  maxLines?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  onChange,
  value = "",
  name,
  placeholder,
  maxLines,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const maxHeight = 120; // Adjust this based on line height (~5-6 lines)

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "15px"; // Reset height
      textArea.style.height = `${Math.min(textArea.scrollHeight, maxHeight)}px`; // Set height with max limit
    }
  }, [value]); // Update on value change

  return (
    <textarea
      ref={textAreaRef}
      id={name}
      name={name}
      onChange={(e) => {
        const value = e.target.value;
        if (
          maxLines &&
          value.replaceAll("\\n", "").split("\n").length > maxLines
        ) {
          return;
        }
        onChange(e.target.value);
      }}
      value={value}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-hidden"
      style={{ maxHeight: `${maxHeight}px` }} // Prevent excessive resizing
    />
  );
};

export default TextArea;

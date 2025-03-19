import clsx from "clsx";
import React from "react";
import TextArea from "./TextArea";

type Props =
  | {
      type: "text" | "number";
      onChange: (value: string) => void;
      value?: string | number;
      name?: string;
      placeholder?: string;
      className?: string;
      maxLines?: unknown;
    }
  | {
      type: "textarea";
      onChange: (value: string) => void;
      value?: string;
      name?: string;
      placeholder?: string;
      className?: string;
      maxLines: number;
    };

export const Input: React.FC<Props> = ({
  type,
  onChange,
  name,
  value,
  placeholder,
  className,
  maxLines,
}) => {
  switch (type) {
    case "text":
    case "number":
      return (
        <div className={clsx("floating-label mt-3", className)}>
          <span>{placeholder}</span>
          <input
            id={name} // Links the label to the input
            name={name}
            type={type}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      );
    case "textarea":
      return (
        <div className={clsx("floating-label mt-3", className)}>
          <span>{placeholder}</span>
          <TextArea
            onChange={onChange}
            value={value as string}
            name={name}
            maxLines={maxLines}
            placeholder={placeholder}
          />
        </div>
      );
    default:
      return null;
  }
};

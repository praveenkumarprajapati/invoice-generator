"use client";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  label?: string;
  value?: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, label, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <select
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={value}
        onChange={handleChange}
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

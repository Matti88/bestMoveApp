import React from 'react';

interface ChipWithCheckboxProps {
  id: number;
  text: string;
  isChecked: boolean;
  onToggle: (id: number) => void;
}

const ChipWithCheckbox: React.FC<ChipWithCheckboxProps> = ({ id, text, isChecked, onToggle }) => {
  return (
    <label
      className={`relative inline-flex items-center select-none whitespace-nowrap rounded-lg py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none ${
        isChecked ? 'bg-green-500 text-white' : 'bg-pink-500 text-white'
      }`}
    >
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={isChecked}
        onChange={() => onToggle(id)}
      />
      <span className="mr-2">{text}</span>
      <span className="mr-2">{isChecked ? 'o' : 'x'}</span>
    </label>
  );
};

export default ChipWithCheckbox;

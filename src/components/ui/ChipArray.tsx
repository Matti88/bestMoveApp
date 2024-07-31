import React from 'react';
import { Checkbox } from "@/components/ui/shadcn/checkbox";

interface ChipWithCheckboxProps {
  id: number;
  text: string;
  poiColor: string;
  isChecked?: boolean;
  onToggle?: (id: number) => void;
}

const ChipWithCheckbox: React.FC<ChipWithCheckboxProps> = ({ id, text, isChecked, poiColor, onToggle }) => {
  const handleChange = () => {
    if (onToggle) {
      onToggle(id);
    }
  };

  // Render only the text if both isChecked and onToggle are not provided
  if (isChecked === undefined && onToggle === undefined) {
    return (
      <span
        className={`inline-flex m-1 items-center select-none whitespace-nowrap rounded-full py-2 px-3.5 font-sans text-xs font-bold uppercase leading-none text-white ${poiColor === '#00bfff' ? 'bg-customBlue' : ''}`}
        style={poiColor !== '#00bfff' ? { backgroundColor: poiColor } : {}}
      >
        {text}
      </span>
    );
  }

  return (
    <label
      className={`relative inline-flex m-1 items-center select-none whitespace-nowrap rounded-full py-2 px-3.5 font-sans text-xs font-bold uppercase leading-none text-white cursor-pointer ${poiColor === '#00bfff' ? 'bg-customBlue' : ''}`}
      style={poiColor !== '#00bfff' ? { backgroundColor: poiColor } : {}}
    >
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="mr-2">{text}</span>
      <Checkbox onCheckedChange={() => handleChange()} checked={isChecked} id={`checkbox-${id}`} />
    </label>
  );
};

export default ChipWithCheckbox;

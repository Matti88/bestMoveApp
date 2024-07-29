import React from 'react';

interface ChipWithCheckboxProps {
  id: number;
  text: string;
  isChecked: boolean;
  poiColor: string;
  onToggle: (id: number) => void;
}

const ChipWithCheckbox: React.FC<ChipWithCheckboxProps> = ({ id, text, isChecked, poiColor, onToggle }) => {
  console.log("color", poiColor); // Log the color prop
  return (
    <label
      className={`relative inline-flex ml-2 items-center select-none whitespace-nowrap rounded-lg py-2 px-3.5 font-sans text-xs font-bold uppercase leading-none text-white ${poiColor === '#00bfff' ? 'bg-customBlue' : ''}`}
      style={poiColor !== '#00bfff' ? { backgroundColor: poiColor } : {}}
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

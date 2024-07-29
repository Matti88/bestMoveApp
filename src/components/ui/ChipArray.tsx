import React from 'react';

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

  return (
    <label
      className={`relative inline-flex m-1 items-center select-none whitespace-nowrap rounded-lg py-2 px-3.5 font-sans text-xs font-bold uppercase leading-none text-white ${poiColor === '#00bfff' ? 'bg-customBlue' : ''}`}
      style={poiColor !== '#00bfff' ? { backgroundColor: poiColor } : {}}
    >
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="mr-2">{text}</span>
      {isChecked && <span className="mr-2">o</span>}
      {!isChecked && <span className="mr-2">x</span>}
    </label>
  );
};

export default ChipWithCheckbox;


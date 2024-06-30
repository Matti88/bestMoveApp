import React from 'react';

interface PinInfoProps {
  thumbnail_image: string;
  title: string;
  insertionpage: string;
  price_num: number;
  sqm_num: number;
  onClose: () => void; // New prop for the close function
}

const PinInfo: React.FC<PinInfoProps> = ({
  thumbnail_image,
  title,
  insertionpage,
  price_num,
  sqm_num,
  onClose // New prop for the close function
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md max-w-md">
      <div className='text-black'>
      <button className="float-right text-gray-500 hover:text-gray-700" onClick={onClose}>
        X
      </button>
        <a href={`https://willhaben.at/${insertionpage}`}>
          <div className="text-lg font-semibold mb-2">Title: {title}</div>

          <img className="mb-4" width={240} src={thumbnail_image} alt={`${title} Image`} />
          <div className="mb-2">Price: {price_num}</div>
          <div>&#x33A1;: {sqm_num}</div>
        </a>
      </div>
    </div>
  );
}

export default PinInfo;

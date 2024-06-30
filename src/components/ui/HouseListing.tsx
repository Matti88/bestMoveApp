import React, {useEffect} from 'react';


interface HouseListingProps {
  imageUrl: string;
  title: string;
  price: number;
  squareMeters: number;
  listingUrl?: string; 
}

const HouseListing: React.FC<HouseListingProps> = ({ imageUrl, title, price, squareMeters, listingUrl }) => {

  return (
    <a href={"https://willhaben.at/" + listingUrl} target="_blank" rel="noopener noreferrer" >
      <div className="flex items-center shadow-md rounded p-4 mb-4 overflow-hidden bg-white">
        <div className="w-20 h-20 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-4">
          <h3>{title}</h3>
          <p>
            Price:{price.toLocaleString()} 
            <br/>
            &#x33A1;: {squareMeters}
          </p>
        </div>
      </div>
    </a>
  );
};

export default HouseListing;

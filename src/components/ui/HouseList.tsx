import React from 'react';
import HouseListing from '@/components/ui/HouseListing'; // Import your HouseListing component

interface HouseListProps {
  listings: {
    title: string;
    address: string; 
    agency: string; 
    collection_date: string; 
    insertionpage: string; 
    lat: number;
    lon: number;
    otherinfo: string; 
    otherinfo_2: string; 
    price: string; 
    price_num: number;
    sqm: string; 
    sqm_num: number;
    thumbnail_image: string; 
  }[];
}

const HouseList: React.FC<HouseListProps> = ({ listings }) => {  

  return (
    <div className={`shadow-md p-4 mb-4 max-w-md mx-auto overflow-y-auto bg-white rounded bg-gray-800 text-black`}>
      <h2 className="border-b pb-2">House Listings</h2>
      <div className="overflow-y-auto">
        {listings.map((listing, index) => (
          <HouseListing
            key={index}
            imageUrl={listing.thumbnail_image}
            title={listing.title}
            price={listing.price_num}
            squareMeters={listing.sqm_num}
            listingUrl={listing.insertionpage}
          />
        ))}
      </div>
    </div>
  );
};

export default HouseList;

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
//import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";

interface HouseListingProps {
  image: string;
  title: string;
  price: number;
  sqm: number;
  listingUrl?: string; 
}

const HouseListing: React.FC<HouseListingProps> = ({ image, title, price, sqm, listingUrl }) => {

  return (
    <a href={listingUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
      <Card className="flex items-center shadow-md  p-2 mb-2 bg-white ">
      <div className="w-20 h-20 ">
            <img src={image} alt={title} className="w-full h-full object-cover border rounded" />
          </div>
        <CardContent className="flex-1 p-4">
          <CardTitle className="text-sx">{title}</CardTitle>
          <p className="text-sm">
            <Label className="block">Price: {price.toLocaleString()}</Label>
            <Label className="block">&#x33A1;: {sqm}</Label>
          </p>
        </CardContent>
      </Card>
    </a>
  );
};

export default HouseListing;

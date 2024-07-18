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

  const shortTitle = title.length > 30 ? `${title.slice(0, 27)}...` : title;

  return (
    <a href={listingUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
      <Card className="w-full max-w-md p-4 mb-4">
        <div className="flex flex-row items-center">
          <div className="flex-shrink-0 w-20 h-20">
            <img src={image} alt={title} className="w-full h-full object-cover border rounded" />
          </div>
          <div className="flex-1 pl-4">
            <CardContent className="p-0">
              <CardTitle>{shortTitle}</CardTitle>
              <div className="text-base">
                <Label>Price: {price.toLocaleString()}</Label>
                <br/>
                <Label>&#x33A1;: {sqm}</Label>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </a>  );
};

export default HouseListing;


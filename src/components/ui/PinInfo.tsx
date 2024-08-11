// PinInfo.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";

interface PinInfoProps {
  thumbnail_image: string;
  title: string;
  price_num: number;
  sqm_num: number;
  linktoInsertion?: string;
  onClose: () => void;
}

const PinInfo: React.FC<PinInfoProps> = ({ thumbnail_image, title, price_num, sqm_num, linktoInsertion, onClose }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cardTitle = title.substring(0, 30);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className='pl-2 pr-2 w-[20vw] absolute bottom-7 right-10 z-10 hidden md:block'>
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle className='text-sm'>{cardTitle}</CardTitle>
          </CardHeader>
          <a href={linktoInsertion}>
            <CardContent className="p-4 pt-0">
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <img className="max-w-[100px] max-h-[100px] mb-4 rounded" src={thumbnail_image} alt={`${title} Image`} />
                </div>
                <div>
                <div className="text-sm font-semibold mb-2">Price:<br/>&#8364;{price_num.toLocaleString('de-DE')}</div>
                <div className="text-sm font-semibold">Area:<br/>{sqm_num}&#x33A1;</div>
                </div>
              </div>
            </CardContent>
          </a>
          <CardFooter className='p-2 pt-0'>
            <Button className='h-8 w-full' onClick={onClose}>Close</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default PinInfo;

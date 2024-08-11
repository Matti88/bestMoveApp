import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/shadcn/drawer";
import { Button } from "@/components/ui/shadcn/button";

interface PinInfoProps {
  thumbnail_image: string;
  title: string;
  price_num: number;
  sqm_num: number;
  linktoInsertion?: string;
  isOpen: boolean;
  onClose: () => void;
}

const PinInfoSmallScreen: React.FC<PinInfoProps> = ({ thumbnail_image, title, price_num, sqm_num, linktoInsertion, isOpen, onClose }) => {
  if (!isOpen) return null;

  if (title.length > 30) {
    title = title.substring(0, 30) + '...';
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="mx-auto w-full max-w-sm p-3 space-y-4">
        <DrawerHeader className='p-2.5'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <a href={linktoInsertion} target="_blank">
          <div className='grid grid-cols-3 gap-4'>
            <div className="flex justify-center items-center col-span-2">
              <img className="w-full h-full object-cover rounded" src={thumbnail_image} alt={`${title} Image`} />
            </div>
            <div className="flex flex-col justify-start">
            <div className="text-sm font-semibold mb-2">Price:<br/>&#8364;{price_num.toLocaleString('de-DE')}</div>
            <div className="text-sm font-semibold">Area:<br/>{sqm_num}&#x33A1;</div>
            </div>
          </div>
        </a>
        <DrawerFooter className='p-2 pl-0 pr-0mt-1'>
          <DrawerClose asChild>
            <Button type='submit' className="w-full" onClick={onClose}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PinInfoSmallScreen;

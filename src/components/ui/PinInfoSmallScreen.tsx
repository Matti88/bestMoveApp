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

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="mx-auto w-full max-w-sm p-4 space-y-4">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <a href={linktoInsertion} target="_blank">
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <img className="max-w-[100px] max-h-[100px] mb-4 rounded" src={thumbnail_image} alt={`${title} Image`} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Price: {price_num}</div>
            <div className="text-sm font-semibold">&#x33A1;: {sqm_num}</div>
          </div>
        </div>
        </a>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button type='submit' className="w-full" onClick={onClose}>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PinInfoSmallScreen;

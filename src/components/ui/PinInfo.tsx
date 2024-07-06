import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { X } from 'lucide-react';

interface PinInfoProps {
  thumbnail_image: string;
  title: string;
  price_num: number;
  sqm_num: number;
  onClose: () => void;
}

const PinInfo: React.FC<PinInfoProps> = ({ thumbnail_image, title, price_num, sqm_num, onClose }) => {
  return (
    <Card className="w-full max-w-md relative">
      <Button className="absolute top-2 right-2" variant="ghost" size="icon" onClick={onClose}>
        <X />
      </Button>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <img className="mb-4 rounded" width={240} src={thumbnail_image} alt={`${title} Image`} />
        <div className="text-lg font-semibold mb-2">Price: {price_num}</div>
        <div className="text-lg font-semibold">&#x33A1;: {sqm_num}</div>
      </CardContent>
    </Card>
  );
};

export default PinInfo;


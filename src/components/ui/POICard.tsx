import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"
import { Input } from "@/components/ui/shadcn/input"
import { Textarea } from "@/components/ui/shadcn/textarea"
import { Button } from "@/components/ui/shadcn/button"

interface POICardProps {
  address: string;
  modeOfTransportation: string;
  timeRange: number;
  title: string;
  onDelete: () => void; // Callback function for delete action
}

const POICard: React.FC<POICardProps> = ({ address, modeOfTransportation, timeRange, title, onDelete }) => {

  return (
    <Card className="w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
      <CardHeader className='p-5
      '>
        <CardTitle>POI Name: {title}</CardTitle>
      </CardHeader>        
      </div>
      <CardContent className="space-y-2">
        <div className="space-y-2">
          <Label >Address</Label>
          <p className="text-gray-600 mb-2">{address}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Mode of Transportation</Label>
          <p className="text-gray-600 mb-2">{modeOfTransportation}</p>
        </div>
        <div className="space-y-1">
          <Label>Time Range:</Label>
          <p className="text-gray-600 mb-2">{timeRange} min</p>
        </div>
        </div>
      </CardContent>
      <CardFooter className='grid place-content-end'>
      <Button  
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default POICard;

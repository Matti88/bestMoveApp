import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"
import { Button } from "@/components/ui/shadcn/button"
import { Switch } from '@/components/ui/shadcn/switch';

interface POICardProps {
  address: string;
  modeOfTransportation: string;
  timeRange: number;
  title: string;
  customId: number;
  color: string;
  dangerZone?: boolean;
  onToggleDangerZone: () => void; // Callback function for toggling danger zone
  onDelete: () => void; // Callback function for delete action
}

const POICard: React.FC<POICardProps> = ({ address, modeOfTransportation, timeRange, title, customId, color, dangerZone  , onDelete, onToggleDangerZone }) => {


  return (
    <Card className="w-full max-w-md">
      <div className="justify-between items-center mb-2">
        <CardHeader className='grid grid-cols-3 place-content-between pb-0 pt-4.5 gap-5'>
          <div className='flex justify-start'>
            <CardTitle>POI Name: {title}</CardTitle>
          </div>
          <div className='flex justify-center items-center'>
            <div 
              style={{ backgroundColor: color || '#000', width: '20px', height: '20px', borderRadius: '50%' }}
            ></div>
          </div>
          <div className='flex content-start justify-end'>
            <Button onClick={onDelete}>
              Delete
            </Button>
          </div>
        </CardHeader>
      </div>
      <CardContent className="space-y-2">
        <div className="space-y-2">
          <Label>Address</Label>
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
      <CardFooter className='grid grid-cols-2 place-content-between gap-4 pb-3'>
        <div>
          <Switch id={customId?.toString()}
            checked={dangerZone}
            onCheckedChange={onToggleDangerZone}
          />
          <Label> Danger Zone</Label>
        </div>
        <div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default POICard;

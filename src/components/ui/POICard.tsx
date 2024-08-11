import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"
import { Button } from "@/components/ui/shadcn/button"
import { Switch } from '@/components/ui/shadcn/switch';
import { ImBin } from "react-icons/im";


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

  const shortAddress = address.length > 30 ? `${address.slice(0, 27)}...` : address;
  

  return (
    <Card className="w-full max-w-md">
      <div className="justify-between items-center mb-2">
        <CardHeader className='grid grid-cols-3 place-content-between pb-0 pt-4.5 gap-5'>
          <div className='flex justify-start self-center '>
            <CardTitle>{title}</CardTitle>
          </div>
          <div className='flex justify-center items-center'>
            <div 
              style={{ backgroundColor: color || '#000', width: '20px', height: '20px', borderRadius: '50%' }}
            ></div>
          </div>
          <div className='flex content-start justify-end'>
            <Button onClick={onDelete}>
              <ImBin/>
            </Button>
          </div>
        </CardHeader>
      </div>
      <CardContent className="space-y-2">
        <div className="space-y-2">
          <p className="text-gray-600 mb-2">{shortAddress}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-gray-600 mb-2"><strong>by</strong> {modeOfTransportation}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-600 mb-2"><strong>within</strong> {timeRange} min</p>
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

import React from 'react';
import POICard from '@/components/ui/POICard';
import { userSearchStore } from '@/store/user-search';

const POIList: React.FC = () => {
  const { deletePOI, toggleDangerZone } = userSearchStore();
  const pois = userSearchStore((state) => state.pois);

  console.log(pois);
   
  return (
    <div className="overflow-y-auto h-full">
      {pois.length > 0 ? (
        pois.map((poi) => (
          <div className="mb-4" key={poi.id}>
            <POICard
              key={poi.id}
              address={poi.address}
              modeOfTransportation={poi.modeOfTransportation}
              timeRange={poi.timeRange}
              title={poi.title}
              customId={poi.id}
              dangerZone={poi.dangerZone}
              color={poi.color}
              onDelete={() => deletePOI(poi.id)}
              onToggleDangerZone={() => toggleDangerZone(poi.id)}
            />
          </div>
        ))
      ) : (
        <p>No points of interest available.</p>
      )}
    </div>
  );
};

export default POIList;

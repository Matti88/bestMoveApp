import React from 'react';
import POICard from '@/components/ui/POICard'
import {userSearchStore} from '@/store/user-search'


const POIList: React.FC = () => {

  const {pois, deletePOI} = userSearchStore()
 
  return (
    <div>
    <div className="overflow-y-auto">
      {pois.length > 0 ? (
        pois.map((poi) => (
          <div className="mb-4">
          <POICard
            key={poi.id}
            address={poi.address}
            modeOfTransportation={poi.modeOfTransportation}
            timeRange={poi.timeRange}
            title={poi.title}
            onDelete={() => deletePOI(poi.id)}
          />
          </div>
        ))
      ) : (
        <p>No points of interest available.</p>
      )}
    </div>
    </div>
  );
};

export default POIList;

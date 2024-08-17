import React, { useState, useEffect, useCallback } from 'react';
import CardDataComponent from "@/components/ui/CardData";
import houselistingStore from '@/store/houselistingStore';
import { userSearchStore } from '@/store/user-search';
import { useNavigate } from "react-router-dom";



type SummaryCard = {
  title: string;
  description: string;
  substitle1: string;
  substitle2: string;
  pathToFileURL: string;
};

const fetchDatasetDescriptions = async () => {
  const response = await fetch("/datasets_descriptions.json");
  const data: SummaryCard[] = await response.json();
  return data;
};

const fetchDangerZoneDescription = async () => {
  const response = await fetch("/pois_dangerZones_descriptions.json");
  const data: SummaryCard[] = await response.json();
  return data;
};

export default function CommunityDatabases() {
  const [cardsHousesProposed, setCardsHousesProposed] = useState<SummaryCard[]>([]);
  const [cardsDangerZones, setCardsDangerZones] = useState<SummaryCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDatasetDescriptions();
        setCardsHousesProposed(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    const dangerZones = async () => {
      try {
        const data = await fetchDangerZoneDescription();
        setCardsDangerZones(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading2(false);
      }
    };

    dangerZones();
    getData();
  }, []);

  // Function to handle house listing data loading
  const handleLoadData = useCallback(async (pathToFileURL: string) => {
    try {
      const response = await fetch(pathToFileURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      houselistingStore.getState().updateHouseListings(data);
      userSearchStore.getState().resetFilters();

      // getting the list of processed houselistings because the updateSearchStats will filter for the houses that are visible
      const listofhouses = houselistingStore.getState().houseListings;
      userSearchStore.getState().updateSearchStats(listofhouses);
      navigate('/mapwork');
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }, [navigate]);

  // Function to handle POI loading and adding to the store
  const handleLoadPoi = useCallback(async (pathToFileURL: string) => {
    try {
      const response = await fetch(pathToFileURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const poiData = await response.json();

      // Ensure the POI data matches the expected structure
      const newPOI = {
        id: 0, // Will be set by zustand
        address: poiData.address,
        lon: poiData.lon,
        lat: poiData.lat,
        modeOfTransportation: poiData.modeOfTransportation,
        timeRange: poiData.timeRange,
        isochrone: poiData.isochrone, // Assuming this is a GeoJSONFeatureCollection
        title: poiData.title,
        minmaxSquare: poiData.minmaxSquare,
        dangerZone: poiData.dangerZone || false,
        color: '', // Will be set by zustand
        colorSwap: '' // Will be set by zustand
      };

      // Add the new POI to the store
      userSearchStore.getState().addPOI(newPOI);

      // redirect to the map page
      navigate('/mapwork');

    } catch (error) {
      console.error("Failed to load POI data:", error);
    }
  }, []);

  if (loading || loading2) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-50 mt-10">
        {/* Houses Proposed Section */}
        <div className="flex flex-wrap gap-8">
          {cardsHousesProposed.map((dataset, index) => (
            <div key={index} className="p-1">
              <CardDataComponent {...dataset} handleLoadData={handleLoadData} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="my-10 border-t-2 border-gray-300" />

        {/* Danger Zones Section */}
        <div className="flex flex-wrap gap-8">
          {cardsDangerZones.map((dataset, index) => (
            <div key={index} className="p-1">
              {/* Pass handleLoadPoi for loading POI data */}
              <CardDataComponent {...dataset} handleLoadData={handleLoadPoi} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import CardDataComponent from "@/components/ui/CardData";

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

export default function CommunityDatabases() {
  const [cardsHousesProposed, setCardsHousesProposed] = useState<SummaryCard[]>([]);
  const [loading, setLoading] = useState(true);

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

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-50 mt-10">
        <div className="flex flex-wrap gap-8">
          {cardsHousesProposed.map((dataset, index) => (
            <div key={index} className="p-1">
              <CardDataComponent {...dataset} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

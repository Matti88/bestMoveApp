import React, { useState, useEffect } from 'react';
import MapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
  Popup
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from '@/components/ui/Pin';
import PinInfo from '@/components/ui/PinInfo';
import houselistingStore , { HouseListing }from '@/store/houselistingStore';
import {userSearchStore} from '@/store/user-search'
  


const MapComponent = () => {
  const [houseMarkers, setHouseMarkers] = useState<React.ReactNode[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<HouseListing | null>(null);
  const [isochrones, setIsochrones] = useState<React.ReactNode[]>([]);
  const [isochronesPins, setisochronesPins] = useState<React.ReactNode[]>([]);
  
  const houses = houselistingStore((state) => state.houseListings);

  useEffect(() => {

      houses.map((house, index) => (
        <div key={`house-marker-${house.id}`}>
          <Marker
            longitude={house.lon}
            latitude={house.lat}
            anchor="bottom"
            onClick={() => setSelectedMarker(house)}
          >
          </Marker>
        </div>
      ));

    

    const unsub2 = userSearchStore.subscribe((state, prevState) => {
      const newIsochrones = state.pois.map((poi) => (
        <Source
          key={`isochrone-source-${poi.id}`}
          id={`multipolygon-${poi.id}`}
          type="geojson"
          data={poi.isochrone}
        >
          <Layer
            key={`isochrone-layer-${poi.id}`}
            id={`multipolygon-layer-${poi.id}`}
            type="fill"
            source={`multipolygon-${poi.id}`}
            paint={{
              'fill-color': colorpalette[poi.id],
              'fill-opacity': 0.3,
            }}
          />
        </Source>
      ));

      const newIsochronesPins = state.pois.map((poi) => (
        <Marker
          key={`house-marker-${poi.id}`}
          longitude={poi.lon}
          latitude={poi.lat}
          anchor="bottom"
        >
          <Pin size={30} />
        </Marker>
      ));

      setIsochrones(newIsochrones);
      setisochronesPins(newIsochronesPins);
    });

    // Return a cleanup function that unsubscribes from both stores
    return () => {
//      unsub1();
      unsub2();
    };
  }, []); // Empty dependency array to run the effect only once on mount

  // token
  const TOKEN = "pk.eyJ1IjoibWF0dGVpbmtvIiwiYSI6ImNsNWphN2hzZjAzem8zY3FvdTd2Y3E1ZXcifQ.aEd1ITI4TdSRLO7gnfxcBg";

  const colorpalette = ['#AA573C', '#7B3D4F', '#0491E5', '#4862C5', '#3DF6D6'];

  return (
    <MapGL
      initialViewState={{
        latitude: 48.2121268,
        longitude: 16.3671307,
        zoom: 13,
      }}
      style={{ width: '100%', height: 750 }}
      mapStyle="mapbox://styles/matteinko/clp6ab2bd00ir01qt5uaedfjf"
      mapboxAccessToken={TOKEN}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {houseMarkers}
      {isochrones}
      {isochronesPins}

      {selectedMarker && (
        <Popup
          longitude={selectedMarker.lon}
          latitude={selectedMarker.lat}
          closeOnClick={false}
          onClose={() => setSelectedMarker(null)}
        >
          <PinInfo
            thumbnail_image={selectedMarker.image}
            title={selectedMarker.title}
            // insertionpage={selectedMarker.insertionpage}
            // price_num={selectedMarker.price_num}
            // sqm_num={selectedMarker.sqm_num}
            onClose={() => setSelectedMarker(null)}
          />
        </Popup>
      )}
    </MapGL>
  );
};

export default MapComponent;

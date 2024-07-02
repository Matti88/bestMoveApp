import React, { useState, useEffect, useMemo } from 'react';
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
import supercluster from 'supercluster';
import Pin from '@/components/ui/Pin';
import PinInfo from '@/components/ui/PinInfo';
import houselistingStore, { HouseListing } from '@/store/houselistingStore';
import { userSearchStore } from '@/store/user-search';
import Supercluster from 'supercluster';

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 48.2121268,
    longitude: 16.3671307,
    zoom: 13,
    width: '100%',
    height: '100%'
  });

  const [selectedMarker, setSelectedMarker] = useState<HouseListing | null>(null);
  const [isochrones, setIsochrones] = useState<React.ReactNode[]>([]);
  const [isochronesPins, setIsochronesPins] = useState<React.ReactNode[]>([]);
  const houses = houselistingStore((state) => state.houseListings);

  const superclusterIndex = useMemo(() => {
    const index = new supercluster({
      radius: 40,
      maxZoom: 16,
    });

    const points: Array<Supercluster.PointFeature<P>> = houses.map((house) => ({
      type: 'Feature',
      properties: { cluster: false, houseId: house.id },
      geometry: {
        type: 'Point',
        coordinates: [house.lon, house.lat]
      }
    }));

    index.load(points);
    return index;
  }, [houses]);

  const clusters = useMemo(() => {
    const bounds: GeoJSON.BBox = [
      viewport.longitude - 360 / (Math.pow(2, viewport.zoom + 1)),
      viewport.latitude - 180 / (Math.pow(2, viewport.zoom)),
      viewport.longitude + 360 / (Math.pow(2, viewport.zoom + 1)),
      viewport.latitude + 180 / (Math.pow(2, viewport.zoom))
    ];

    return superclusterIndex.getClusters(bounds, Math.floor(viewport.zoom));
  }, [superclusterIndex, viewport]);

  const houseMarkers = clusters.map((cluster) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

    if (isCluster) {
      return (
        <Marker
          key={`cluster-${cluster.id}`}
          longitude={longitude}
          latitude={latitude}
          anchor="bottom"
        >
          <div
            style={{
              width: `${10 + (pointCount / houses.length) * 20}px`,
              height: `${10 + (pointCount / houses.length) * 20}px`,
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            onClick={() => {
              const expansionZoom = Math.min(
                superclusterIndex.getClusterExpansionZoom(cluster.id),
                20
              );
              setViewport({
                ...viewport,
                latitude,
                longitude,
                zoom: expansionZoom
              });
            }}
          >
            {pointCount}
          </div>
        </Marker>
      );
    }

    const house = houses.find((h) => h.id === cluster.properties.houseId);

    return (
      <Marker
        key={`house-marker-${house?.id}`}
        longitude={longitude}
        latitude={latitude}
        anchor="bottom"
        onClick={() => setSelectedMarker(house || null)}
      >
        <Pin size={30} />
      </Marker>
    );
  });

  useEffect(() => {
    const unsub2 = userSearchStore.subscribe((state) => {
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
          key={`poi-marker-${poi.id}`}
          longitude={poi.lon}
          latitude={poi.lat}
          anchor="bottom"
        >
          <Pin size={30} />
        </Marker>
      ));

      setIsochrones(newIsochrones);
      setIsochronesPins(newIsochronesPins);
    });

    // Return a cleanup function that unsubscribes from the store
    return () => {
      unsub2();
    };
  }, []);

  // token
  const TOKEN = "pk.eyJ1IjoibWF0dGVpbmtvIiwiYSI6ImNsNWphN2hzZjAzem8zY3FvdTd2Y3E1ZXcifQ.aEd1ITI4TdSRLO7gnfxcBg";
  const colorpalette = ['#AA573C', '#7B3D4F', '#0491E5', '#4862C5', '#3DF6D6'];

  return (
    <MapGL
      {...viewport}
      onViewportChange={(newViewport) => setViewport(newViewport)}
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

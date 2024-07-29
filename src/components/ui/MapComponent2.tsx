import { useState, useMemo } from 'react';
import MapGL, { Marker, ScaleControl, Source, Layer, Popup, ViewState } from 'react-map-gl';
import supercluster from 'supercluster';
import Pin from '@/components/ui/Pin';
import PinInfo from '@/components/ui/PinInfo';
import houselistingStore, { HouseListing } from '@/store/houselistingStore';
import { userSearchStore } from '@/store/user-search';
import Supercluster from 'supercluster';
import { BBox, Point } from 'geojson';

const MapComponent: React.FC = () => {
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 48.2121268,
    longitude: 16.3671307,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  const [selectedMarker, setSelectedMarker] = useState<HouseListing | null>(null);
  const houses = houselistingStore((state) => state.houseListings);
  const pois = userSearchStore((state) => state.pois);

  const superclusterIndex = useMemo(() => {
    const index = new supercluster({radius: 40, maxZoom: 16});

    const points: Array<Supercluster.PointFeature<Point>> = houses
      .filter((house) => house.displayed)
      .map((house) => ({
        type: 'Feature',
        properties: { type: 'Point', coordinates: [house.lon, house.lat], cluster: false, houseId: house.id },
        geometry: {
          type: 'Point',
          coordinates: [house.lon, house.lat],
        },
      }));

    index.load(points);
    return index;
  }, [houses]);

  const clusters = useMemo(() => {
    const bounds: BBox = [
      viewport.longitude - 360 / Math.pow(2, viewport.zoom ),
      viewport.latitude - 180 / Math.pow(2, viewport.zoom),
      viewport.longitude + 360 / Math.pow(2, viewport.zoom ),
      viewport.latitude + 180 / Math.pow(2, viewport.zoom),
    ];

    return superclusterIndex.getClusters(bounds, Math.floor(viewport.zoom));

  }, [superclusterIndex, viewport]);

  const houseMarkers = clusters.map((cluster) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

    if (isCluster) {
      return (
        <Marker key={`cluster-${cluster.id}`} longitude={longitude} latitude={latitude} anchor="bottom">
          <div
            style={{
              width: `${50 + pointCount / houses.length}px`,
              height: `${50 + pointCount / houses.length}px`,
              backgroundColor: 'blue',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '33px',
              cursor: 'pointer',
            }}
            onClick={() => {
              const expansionZoom = Math.min(
                superclusterIndex.getClusterExpansionZoom(
                  typeof cluster.id === 'string' ? parseInt(cluster.id, 10) : cluster.id ?? 0
                ),
                16
              );
              setViewport({
                ...viewport,
                latitude,
                longitude,
                zoom: expansionZoom,
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
        <Pin size={40} />
      </Marker>
    );
  });

  const colorpalette = ['#AA573C', '#7B3D4F', '#0491E5', '#4862C5', '#3DF6D6', '#d75ac5', '#d7e531', '#f58831'];

  const isochrones = useMemo(() => {
    return pois.map((poi) => (
      <Source key={`isochrone-source-${poi.id}`} id={`multipolygon-${poi.id}`} type="geojson" data={poi.isochrone}>
        <Layer
          key={`isochrone-layer-${poi.id}`}
          id={`multipolygon-layer-${poi.id}`}
          type="fill"
          source={`multipolygon-${poi.id}`}
          paint={{
            'fill-color': poi.color ? poi.color : colorpalette[Math.floor(Math.random() * colorpalette.length)],
            'fill-opacity': 0.3,
          }}
        />
      </Source>
    ));
  }, [pois]);

  const isochronesPins = useMemo(() => {
    return pois.map((poi) => (
      <Marker key={`poi-marker-${poi.id}`} longitude={poi.lon} latitude={poi.lat} anchor="bottom">
        <Pin size={70} color="#008080" />
      </Marker>
    ));
  }, [pois]);

  // token
  const TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

  return (
    <MapGL
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={TOKEN}
    >
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
            price_num={selectedMarker.price}
            sqm_num={selectedMarker.sqm}
            linktoInsertion={selectedMarker.link}
            onClose={() => setSelectedMarker(null)}
          />
        </Popup>
      )}
    </MapGL>
  );
};

export default MapComponent;

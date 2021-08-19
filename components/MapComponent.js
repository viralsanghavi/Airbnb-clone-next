import { getCenter } from "geolib";
import { useState } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
const MapComponent = ({ searchResults }) => {
  const [selected, setSelected] = useState({});
  //   Transform seach results  in to obj of {latitude:3421,longitude:123}
  const coordinates = searchResults.map((coord) => ({
    longitude: coord.long,
    latitude: coord.lat,
  }));
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center?.latitude,
    longitude: center?.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGl
      mapboxApiAccessToken={process.env.mapbox_key}
      mapStyle="mapbox://styles/vsanghavi3/cksisyxwid4ft18qqvm707eao"
      onViewportChange={(viewport) => setViewport(viewport)}
      {...viewport}
    >
      {searchResults?.map((results) => (
        <div key={results.long + results.lat}>
          <Marker
            longitude={results.long}
            offsetLeft={-20}
            offsetTop={-10}
            latitude={results.lat}
          >
            <p
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelected(results)}
              aria-label="push-pin"
              role="img"
            >
              📌
            </p>
          </Marker>
          {/* Popup to show if clicked on marker */}
          {selected.long === results.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelected({})}
              latitude={results.lat}
              longitude={results.long}
            >
              {results.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGl>
  );
};

export default MapComponent;

import React, { useRef,useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

/**
 * @param markers is an array of objects containing keys latitude, longitude and name of the markers to be shown on the map
 */
const MapMarkerAutoZoom = ({ markers }) => {
  // Set your initialRegion
  const [region, setRegion] = useState({
    latitude: 10.013352,
    longitude: 76.329984,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const mapRef = useRef();

  // Call fitToSuppliedMarkers() method on the MapView after markers get updated
  useEffect(() => {
    if (mapRef.current) {
      // list of _id's must same that has been provided to the identifier props of the Marker
      mapRef.current.fitToSuppliedMarkers(markers.map(({ _id }) => _id));
    }
  }, [markers]);

  return (
    <MapView ref={mapRef} initialRegion={region} region={region}>
      {markers.map((marker) => (
        <Marker
          key={marker.key}
          identifier={marker.key}
          coordinate={{
            latitude: marker.location.latitude,
            longitude: marker.location.longitude,
          }}
          title={marker.name}
        />
      ))}
    </MapView>
  );
};

MapMarkerAutoZoom.defaultProps = {
  markers: [],
};

MapMarkerAutoZoom.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

export default MapMarkerAutoZoom;
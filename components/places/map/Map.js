import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMapGL, { Marker } from 'react-map-gl';
import { LocationMarkerIcon, XIcon } from '@heroicons/react/solid';

export function Markers() {
  const [showPopup, setShowPopup] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get('https://juliebl-exam.herokuapp.com/places')
      .then((response) => {
        setMarkers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <>
        <p>error</p>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <p>loading</p>
      </>
    );
  }
  return (
    <>
      {markers.map((place) => (
        <Marker
          key={place.id}
          latitude={place.latitude}
          longitude={place.longitude}>
          <LocationMarkerIcon
            onClick={() => setShowPopup(!showPopup)}
            className="text-primary cursor-pointer hover:text-primary-dark w-6"
          />

          {showPopup && (
            <div className="transition w-60 p-5 mt-2 rounded-md shadow bg-white">
              <XIcon
                onClick={() => setShowPopup(!showPopup)}
                className="cursor-pointer w-4 ml-auto"
              />
              <p>yolo</p>
            </div>
          )}
        </Marker>
      ))}
    </>
  );
}

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 60.3855,
    longitude: 5.32,
    zoom: 12,
  });

  return (
    <ReactMapGL
      width="100%"
      height="100%"
      mapStyle={'mapbox://styles/mapbox/streets-v11?optimize=true'}
      mapboxApiAccessToken="pk.eyJ1IjoiYXBwbGVjNGtlIiwiYSI6ImNrbnN1aXRveDA5aG4ybnIwZ2JtbHM0MzMifQ.zvrylbGNC5_Kc9Fg7m_1mw"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}>
      <Markers />
    </ReactMapGL>
  );
}

export default Map;

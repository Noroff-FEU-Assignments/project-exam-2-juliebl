import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { LocationMarkerIcon, XIcon } from '@heroicons/react/solid';
import CardListItem from '../card/CardListItem';
import Link from 'next/link';
import { BASE_URL } from '../../../constants/api';
import useSWR from 'swr';

export function Markers({
  showPopup,
  setShowPopup,
  activePlace,
  setActivePlace,
}) {
  const { data, error } = useSWR(BASE_URL + 'places');
  if (error) return <p>error</p>;
  if (!data) return <p>loading..</p>;
  return (
    <>
      {data.map((place) => (
        <Marker
          key={place.id}
          latitude={place.latitude}
          longitude={place.longitude}
          className="z-50 mt-6">
          <Transition
            show={showPopup === place.id}
            onMouseLeave={() => setShowPopup(null)}
            onClick={() => setActivePlace(place.id)}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="grid grid-cols-3 transition min-h-24 w-64 rounded-md shadow bg-white">
              <div className="col-span-1">
                <Link href={`/places/${place.slug}`}>
                  <a>
                    <img
                      src={place.featured_image.formats.thumbnail.url}
                      alt=""
                      className="object-cover w-full h-full rounded-l-md"
                    />
                  </a>
                </Link>
              </div>
              <div className="col-span-2 text-sm p-3 flex flex-col justify-center">
                <Link href={`/places/${place.slug}`}>
                  <a>
                    <p className="font-semibold mb-2 break-words">
                      {place.title}
                    </p>
                  </a>
                </Link>
                <p className="mb-2">${place.price} / night</p>
                <CardListItem icon="guest" text={place.guests} />
              </div>
            </div>
          </Transition>
        </Marker>
      ))}
    </>
  );
}

export function Pins({
  data,
  showPopup,
  setShowPopup,
  activePlace,
  setActivePlace,
}) {
  return (
    <>
      {data.map((place) => (
        <Marker
          key={place.id}
          latitude={place.latitude}
          longitude={place.longitude}
          className="z-10">
          <Link href={`/places/${place.slug}`}>
            <LocationMarkerIcon
              onMouseEnter={() => setShowPopup(place.id)}
              className="cursor-pointer text-primary hover:text-primary-dark w-6"
            />
          </Link>
        </Marker>
      ))}
    </>
  );
}
function Map({ showPopup, setShowPopup, activePlace, setActivePlace }) {
  const [viewport, setViewport] = useState({
    latitude: 60.3855,
    longitude: 5.32,
    zoom: 12,
  });
  const [size, setSize] = useState({
    width: '100%',
    height: '100%',
  });
  const { data, error } = useSWR(BASE_URL + 'places');
  if (error) return <p>error</p>;
  if (!data) return <p>loading..</p>;

  return (
    <ReactMapGL
      mapStyle={'mapbox://styles/mapbox/streets-v11?optimize=true'}
      mapboxApiAccessToken="pk.eyJ1IjoiYXBwbGVjNGtlIiwiYSI6ImNrbnN1aXRveDA5aG4ybnIwZ2JtbHM0MzMifQ.zvrylbGNC5_Kc9Fg7m_1mw"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      {...size}
      onSizeChange={(nextSize) => setSize(nextSize)}>
      <Pins
        data={data}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        activePlace={activePlace}
        setActivePlace={setActivePlace}
      />
      <Markers
        data={data}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        activePlace={activePlace}
        setActivePlace={setActivePlace}
      />
    </ReactMapGL>
  );
}

export default Map;

import Head from '../../components/layout/Head';
import { useState } from 'react';
import Heading from '../../components/common/Heading';
import Layout from '../../components/layout/Layout';
import Map from '../../components/places/map/Map';
import Cards from '../../components/places/card/Cards';
import SearchBar from '../../components/places/SearchBar';
import { BASE_URL } from '../../constants/api';
import useSWR from 'swr';

function Home() {
  const [activePlace, setActivePlace] = useState(2);
  const [showPopup, setShowPopup] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const url = BASE_URL + 'places?_sort=title:ASC';

  const { data, error } = useSWR(url);

  if (error) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  if (!data) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <Layout containerSize="fullWidth">
      <Head title="Accommodations" />
      {/*  <Heading text="Map" />*/}
      <div className="bg-white max-w-2xl ml-4" style={{ height: '100px' }}>
        <SearchBar
          data={data}
          filteredPlaces={filteredPlaces}
          setFilteredPlaces={setFilteredPlaces}
        />
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-4 places__wrapper">
        <div className="hidden md:block relative col-span-3 row-span-2 map__wrapper bg-gray-200">
          <Map
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            activePlace={activePlace}
            setActivePlace={setActivePlace}
          />
        </div>
        <ul className="col-span-5 md:col-span-2 row-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4 overflow-y-auto">
          <Cards
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            activePlace={activePlace}
            setActivePlace={setActivePlace}
          />
        </ul>
      </div>
    </Layout>
  );
}
export default Home;

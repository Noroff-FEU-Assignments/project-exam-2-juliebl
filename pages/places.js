import Head from '../components/layout/Head';
import Heading from '../components/common/Heading';
import Layout from '../components/layout/Layout';
import Map from '../components/places/map/Map';
import Card from '../components/places/card/Card';
import { getData } from '../hooks/useApi';

export default function Home() {
  const { data, loading, error } = getData('places');

  console.log(data);
  return (
    <Layout containerSize="fullWidth">
      <Head />
      {/*  <Heading text="Map" />*/}
      <div className="places__wrapper">
        <div className="bg-gray-500" style={{ height: '100px' }}>
          <p>fhaeijefioa</p>
        </div>
        <div className="flex gap-4">
          <div className="flex-grow map__wrapper bg-gray-200">
            {/* <Map /> */}
          </div>
          <ul className="flex-grow w-1/2 grid grid-cols-2 gap-2 overflow-y-auto">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </ul>
        </div>
      </div>
    </Layout>
  );
}

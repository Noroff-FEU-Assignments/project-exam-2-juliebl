import Head from '../components/layout/Head';
import Heading from '../components/common/Heading';
import Layout from '../components/layout/Layout';
import Map from '../components/places/map/Map';

export default function Home() {
  return (
    <Layout>
      <Head />
      <Heading text="Map" />
      <Map />
    </Layout>
  );
}

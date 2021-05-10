import Head from '../components/layout/Head';
import Heading from '../components/common/Heading';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/contact/ContactForm';

export default function Home() {
  return (
    <Layout containerSize="smallWidth">
      <Head title="Contact" />
      <Heading text="Contact" />
      <ContactForm />
    </Layout>
  );
}

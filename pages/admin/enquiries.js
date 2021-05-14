import AdminLayout from '../../components/admin/layout/AdminLayout';
import Heading from '../../components/common/Heading';
import Head from '../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { fetchAdminData } from '../../hooks/useApi';

function Enquiries() {
  const { data, error } = fetchAdminData('enquiries');
  console.log(data);
  return (
    <>
      <AdminLayout>
        <Head title="Enquiries | Dashboard" />
        <Heading text="Enquiries" />
      </AdminLayout>
    </>
  );
}

export default Enquiries;

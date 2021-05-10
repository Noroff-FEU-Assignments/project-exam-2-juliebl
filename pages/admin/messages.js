import AdminLayout from '../../components/admin/layout/AdminLayout';
import Heading from '../../components/common/Heading';
import Head from '../../components/layout/Head';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';

function Messages() {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push('/login');
    }
  });
  return (
    <>
      {auth && (
        <AdminLayout>
          <Head title="Messages | Dashboard" />
          <Heading text="Messages" />
        </AdminLayout>
      )}
    </>
  );
}

export default Messages;

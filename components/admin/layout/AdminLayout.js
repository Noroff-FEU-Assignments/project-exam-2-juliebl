import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { getAuth } from '../../../hooks/useLocalStorage';
import SidebarToggle from './sidebar/SidebarToggle';
import MobileSidebar from './sidebar/MobileSidebar';
import Sidebar from './sidebar/Sidebar';
import Link from 'next/link';
import AuthContext from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import { fetchAdminData } from '../../../hooks/useApi';
import { BigMessage } from '../../common/Message';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push('/login');
    }
  }, []);

  function logout() {
    router.push('/login');
    setAuth(null);
  }

  const user = auth.user;
  const { data, error } = fetchAdminData('messages?new=true');

  if (error) {
    console.log(error);
    return (
      <div>
        <BigMessage message={`Error: ${error}`} style="danger" />
      </div>
    );
  }
  let newMessages;
  if (data) {
    newMessages = data.length;
  }

  if (!data) {
    return (
      <div>
        <BigMessage message="Loading dashboard..." style="loading" />
      </div>
    );
  }
  return (
    <>
      {auth && (
        <>
          <Disclosure
            as="nav"
            className="md:hidden z-10 md:h-16 bg-secondary-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link href="/">
                  <a>
                    <img
                      src="/logo_white.svg"
                      alt="Holidaze Logo"
                      className="w-36"
                    />
                  </a>
                </Link>

                <SidebarToggle
                  setSidebarOpen={setSidebarOpen}
                  sidebarOpen={sidebarOpen}
                />
              </div>
            </div>
            <MobileSidebar
              sidebarOpen={sidebarOpen}
              auth={auth}
              setAuth={setAuth}
              user={user}
              newMessages={newMessages}
              logout={logout}
            />
          </Disclosure>
          <div className="flex flex-row min-h-screen z-20 bg-neutral-light">
            <div className="hidden md:block w-80 h-screen">
              <Sidebar
                auth={auth}
                setAuth={setAuth}
                user={user}
                newMessages={newMessages}
                logout={logout}
              />
            </div>
            <div className="w-full">
              <main className="mx-auto h-full">{children}</main>
            </div>
          </div>
        </>
      )}
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;

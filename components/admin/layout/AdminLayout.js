import PropTypes from 'prop-types';
import Sidebar from './sidebar/Sidebar';

function AdminLayout({ children }) {
  return (
    <div className="flex flex-row min-h-screen z-20 bg-neutral-light">
      <div className="w-80 h-screen">
        <Sidebar />
      </div>

      <div className="w-full">
        <main className="mx-auto h-full">{children}</main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;

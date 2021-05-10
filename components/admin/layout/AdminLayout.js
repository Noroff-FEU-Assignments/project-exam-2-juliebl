import PropTypes from 'prop-types';
import Sidebar from './sidebar/Sidebar';

function AdminLayout({ children }) {
  return (
    <div className="flex flex-row min-h-screen z-20">
      <Sidebar />
      <div className="flex-grow">
        <main className="mx-auto">{children}</main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;

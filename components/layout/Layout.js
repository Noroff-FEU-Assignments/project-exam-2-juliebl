import PropTypes from 'prop-types';
import Footer from './Footer';
import Navbar from './navbar/Navbar';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen z-20">
      <Navbar />
      <div className="flex-grow mx-auto container px-4 sm:px-6 lg:px8">
        <main className="mx-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

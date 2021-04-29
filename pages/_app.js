import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../context/AuthContext';
import 'mapbox-gl/dist/mapbox-gl.css';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;

import '../styles/globals.css';
import { Routes, Route } from 'next/router';

function MyApp({ Component, pageProps }) {
  return (
    <Routes>
      <Route path="/" element={<Component {...pageProps} />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<User />} />
    </Routes>
  );
}

export default MyApp;
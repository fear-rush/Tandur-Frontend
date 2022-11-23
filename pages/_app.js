import '../styles/globals.css';
import Layout from '../components/Layout';
// import { SessionProvider } from 'next-auth/react';
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';

const noAuthRoutes = ['/', '/contact'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // return (
  //   <SessionProvider>
  //     <Layout>
  //       <Component {...pageProps} />
  //     </Layout>
  //   </SessionProvider>
  // );
  return (
    <AuthContextProvider>
      <Layout>
        {noAuthRoutes.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;

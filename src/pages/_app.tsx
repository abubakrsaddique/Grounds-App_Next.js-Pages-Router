import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../../context/AuthContext";
import PrivateLayout from "../../components/layouts/private/PrivateLayout";
import PublicLayout from "../../components/layouts/public/PublicRoutes";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const isPublicRoute = ["/login", "/signup", "/checkout"].includes(
    router.pathname
  );

  const Layout = isPublicRoute ? PublicLayout : PrivateLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

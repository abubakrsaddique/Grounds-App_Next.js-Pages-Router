import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../../context/AuthContext";
import { ReactNode } from "react";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const renderLayout =
    (Component as any).privateLayout || ((page: ReactNode) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {renderLayout(<Component {...pageProps} />)}
        <ToastContainer position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

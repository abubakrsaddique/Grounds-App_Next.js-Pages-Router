import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AppProviders } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <Component {...pageProps} />
      <ToastContainer position="top-center" />
    </AppProviders>
  );
}

export default MyApp;

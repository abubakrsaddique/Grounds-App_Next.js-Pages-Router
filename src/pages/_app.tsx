import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AppProviders } from "../../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
}

export default MyApp;

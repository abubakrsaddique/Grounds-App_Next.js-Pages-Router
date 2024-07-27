import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../context/AuthContext";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!loading) {
        if (!user && url !== "/login" && url !== "/signup") {
          router.push("/login");
        } else if (user && (url === "/login" || url === "/signup")) {
          router.push("/dashboard");
        }
      }
    };

    handleRouteChange(router.pathname);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [loading, user, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default PrivateRoutes;

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
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (
        router.pathname === "/login" ||
        router.pathname === "/signup"
      ) {
        router.replace("/dashboard");
      }
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default PrivateRoutes;

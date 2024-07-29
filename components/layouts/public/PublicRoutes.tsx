import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../context/AuthContext";

interface PublicRoutesProps {
  children: ReactNode;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && user) {
      const restrictedRoutes = ["/login", "/signup"];
      if (restrictedRoutes.includes(router.pathname)) {
        router.push("/dashboard");
      }
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default PublicRoutes;

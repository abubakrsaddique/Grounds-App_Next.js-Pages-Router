import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../context/AuthContext";

interface PublicRoutesProps {
  children: ReactNode;
}

function PublicRoutes({ children }: PublicRoutesProps) {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && user) {
      const publicRoutes = ["/login", "/signup", "/checkout"];
      if (publicRoutes.includes(router.pathname)) {
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

  return <>{!user && children}</>;
}

export default PublicRoutes;

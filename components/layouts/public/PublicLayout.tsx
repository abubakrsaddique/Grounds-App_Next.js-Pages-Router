import React, { ReactNode } from "react";

import { AuthProvider } from "../../../context/AuthContext";
import PublicRoutes from "./PublicRoutes";

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthProvider>
        <PublicRoutes>{children}</PublicRoutes>
      </AuthProvider>
    </>
  );
}

export default PublicLayout;

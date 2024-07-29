import React, { ReactNode } from "react";

import PublicRoutes from "./PublicRoutes";

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicRoutes>{children}</PublicRoutes>
    </>
  );
}

export default PublicLayout;

import { ReactNode } from "react";
import PrivateRoutes from "./PrivateRoutes";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <>
      <PrivateRoutes>{children}</PrivateRoutes>
    </>
  );
};

export default PrivateLayout;

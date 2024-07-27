import { ReactNode } from "react";
import { AuthProvider } from "../../../context/AuthContext";
import PrivateRoutes from "./PrivateRoutes";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <PrivateRoutes>{children}</PrivateRoutes>
    </AuthProvider>
  );
};

export default PrivateLayout;

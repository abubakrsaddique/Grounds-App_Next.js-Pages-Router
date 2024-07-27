import { ReactNode } from "react";

declare module "next" {
  interface NextPage {
    privateLayout?: (page: ReactNode) => ReactNode;
  }
}

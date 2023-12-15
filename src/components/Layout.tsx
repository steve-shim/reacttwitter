import { ReactNode } from "react";
import MenuList from "./Menu";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  console.log("[Layout]");
  return (
    <div className="layout">
      {children}
      <MenuList />
    </div>
  );
};

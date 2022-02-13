import { ReactNode } from "react";
import clsx from "clsx";
import Nav from "./components/nav";

const DefaultLayout = ({
  children,
  className = "",
  showLogo = true,
}: {
  children: ReactNode;
  className?: string;
  showLogo?: boolean;
}) => {
  return (
    <div className={clsx("w-full min-h-screen max-w-site mx-auto", className)}>
      <Nav showLogo={showLogo} />
      {children}
    </div>
  );
};

export default DefaultLayout;

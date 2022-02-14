import { ReactNode } from "react";
import clsx from "clsx";
import Nav from "./components/nav";

const DefaultLayout = ({
  children,
  className = "",
  showLogo = true,
  navContent,
}: {
  children: ReactNode;
  className?: string;
  showLogo?: boolean;
  navContent?: ReactNode;
}) => {
  return (
    <div className={clsx("w-full min-h-screen max-w-site mx-auto", className)}>
      <Nav showLogo={showLogo}  content={navContent} />
      {children}
    </div>
  );
};

export default DefaultLayout;

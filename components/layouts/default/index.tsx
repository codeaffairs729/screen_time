import { ReactNode } from "react";
import clsx from "clsx";
import Nav from "./components/nav";
import Footer from "./components/footer";

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
    <div
      className={clsx(
        "w-full min-h-screen max-w-site mx-auto flex flex-col",
        className
      )}
    >
      <Nav showLogo={showLogo} content={navContent} />
      {children}
      <Footer className="mt-auto" />
    </div>
  );
};

export default DefaultLayout;

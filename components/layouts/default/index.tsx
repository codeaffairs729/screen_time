import { ReactNode } from "react";
import clsx from 'clsx';
import Nav from "./components/nav";

const DefaultLayout = ({ children, className="" }: { children: ReactNode, className?: string }) => {
  return (
    <div className={clsx("w-full min-h-screen", className)}>
      {/* <div className="bg-gray-500 text-white">Navv</div> */}
      <Nav/>
      {children}
    </div>
  );
};

export default DefaultLayout;

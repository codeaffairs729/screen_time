import { ReactNode } from "react";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-gray-500 text-white">Navv</div>
      {children}
    </>
  );
};

export default DefaultLayout;

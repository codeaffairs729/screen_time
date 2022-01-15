import { ReactNode } from "react";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>Nav</div>
      {children}
    </>
  );
};

export default DefaultLayout;

import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

const TabHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          "flex text-sm font-semibold p-3",
          selected ? "text-dtech-primary-dark" : "text-gray-500"
        )
      }
    >
      {children}
    </Tab>
  );
};

export default TabHeader;

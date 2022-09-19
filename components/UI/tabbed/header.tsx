import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

const TabHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "flex text-sm font-semibold p-3 outline-none w-full",
                    selected
                        ? "text-dtech-primary-dark bg-gray-100"
                        : "text-gray-500"
                )
            }
        >
            <div className="mx-auto">{children}</div>
        </Tab>
    );
};

export default TabHeader;

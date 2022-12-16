import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

const TabHeader = ({ children, className="" }: { children: ReactNode, className?: string }) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "flex text-sm font-semibold p-3 outline-none w-full",
                    selected
                        ? "text-dtech-primary-dark bg-gray-100 border-l-5 border-dtech-main-dark"
                        : "text-gray-500"
                )
            }
        >
            <div className={clsx("mx-auto", className)}>{children}</div>
        </Tab>
    );
};

export default TabHeader;

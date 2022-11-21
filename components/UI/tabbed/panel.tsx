import { Tab } from "@headlessui/react";
import { ReactNode } from "react";
import clsx from "clsx";

const TabPanel = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <Tab.Panel
            className={clsx(
                "w-full bg-gray-100 p-6 min-h-[calc(100vh-260px)] overflow-y-auto",
                className
            )}
        >
            {children}
        </Tab.Panel>
    );
};

export default TabPanel;

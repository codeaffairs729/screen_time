import { Tab } from "@headlessui/react";
import { ReactNode } from "react";

const TabPanel = ({ children }: { children: ReactNode }) => {
    return (
        <Tab.Panel className="w-full bg-gray-100 p-6 min-h-[calc(100vh-260px)] overflow-y-auto">
            {children}
        </Tab.Panel>
    );
};

export default TabPanel;

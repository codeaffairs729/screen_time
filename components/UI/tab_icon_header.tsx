import { ReactNode } from "react";
import { Tab } from "@headlessui/react";

const TabIconHeader = ({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: Function;
}) => {
    return (
        <Tab
            className={({ selected }) =>
                `${
                selected && " !border-t-dtech-new-main-light bg-white"
                } flex items-center hover:bg-dtech-light-teal justify-center border-t-4 sm:h-20 h-10 border-t-[#ACACAC] text-sm font-bold transition-all duration-300 outline-none w-full border-y border-gray`
            }
            onClick={() => onClick()}
        >
                {children}
        </Tab>
    );
};

export default TabIconHeader;

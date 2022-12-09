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
                    selected && "border-l-4 border-l-dtech-main-dark"
                } flex text-sm font-semibold transition-all duration-300 outline-none w-full border-y`
            }
            onClick={() => onClick()}
        >
            <div className="w-50 h-26 flex flex-col items-center justify-center">
                {children}
            </div>
        </Tab>
    );
};

export default TabIconHeader;

import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

const TabHeader = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "flex text-lg  p-3 outline-none w-full text-fuchsia-800 ",
                    selected
                        ? "font-black text-dtech-primary-dark bg-gray-100 border-l-5 border-dtech-main-dark underline underline-offset-4 bg-dtech-main-light text-fuchsia-900"
                        : "text-gray-500"
                )
            }
        >
            <div className={clsx("mx-auto", className)}>{children}</div>
        </Tab>
    );
};

export default TabHeader;

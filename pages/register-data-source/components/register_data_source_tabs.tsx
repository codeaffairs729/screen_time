import { Tab } from "@headlessui/react";
import cascadeFolderOutline from "public/images/icons/cascade_folder_outline.svg";
import cascadeFolderFilled from "public/images/icons/cascade_folder_filled.svg";
import barGraphOutline from "public/images/icons/bar_graph_outline.svg";
import barGraphFilled from "public/images/icons/bar_graph_filled.svg";
import { useState } from "react";
import TabIconHeader from "components/UI/tab_icon_header";

type Header = {
    name: string;
    outlineIcon: string;
    filledIcon: string;
};

const ORGANIZATION_ADMIN = "Organisation Admin";
const ORGANIZATION_MEMBER = "Organisation Member";

const RegisterDataSourceTabHeaders = ({
    selectedIndex = 0,
    user = "",
}: {
    selectedIndex?: number;
    user?: string;
}) => {
    const [selected, setSelected] = useState<number>(selectedIndex);

    return (
            <Tab.List className=" flex text-dtech-new-main-light w-full space-x-2">
                {getHeader(user).map((header: Header, index: number) => (
                    <TabIconHeader
                        key={index}
                        onClick={() => setSelected(index)}
                    >
                        <span className="text-dtech-new-main-light text-xs sm:text-[22px]">
                            {header.name}
                        </span>
                    </TabIconHeader>
                ))}
            </Tab.List>
    );
};

const getHeader = (user: string) => {
    return [
        {
            name: "Register data source",
            outlineIcon: cascadeFolderOutline,
            filledIcon: cascadeFolderFilled,
        },
        {
            name: "View data source catalogue",
            outlineIcon: barGraphOutline,
            filledIcon: barGraphFilled,
        },
    ];
};

export default RegisterDataSourceTabHeaders;

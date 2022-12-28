import { Tab } from "@headlessui/react";
import Image from "next/image";
import historyOutline from "public/images/icons/history_outline.svg";
import historyFilled from "public/images/icons/history_filled.svg";
import bellOutline from "public/images/icons/bell_outline.svg";
import bellFilled from "public/images/icons/bell_filled.svg";
import cascadeFolderOutline from "public/images/icons/cascade_folder_outline.svg";
import cascadeFolderFilled from "public/images/icons/cascade_folder_filled.svg";
import listOutline from "public/images/icons/list_outline.svg";
import listFilled from "public/images/icons/list_filled.svg";
import TabIconHeader from "components/UI/tab_icon_header";
import { useState } from "react";

type Header = {
    name: string;
    outlineIcon: string;
    filledIcon: string;
};

const HEADERS: Header[] = [
    {
        name: "Datasets",
        outlineIcon: cascadeFolderOutline,
        filledIcon: cascadeFolderFilled,
    },
    {
        name: "Lists",
        outlineIcon: listOutline,
        filledIcon: listFilled,
    },
    {
        name: "History",
        outlineIcon: historyOutline,
        filledIcon: historyFilled,
    },
    {
        name: "Notifications",
        outlineIcon: bellOutline,
        filledIcon: bellFilled,
    },
];

const TabHeaders = ({ selectedIndex = 0 }: { selectedIndex?: number }) => {
    const [selected, setSelected] = useState<number>(selectedIndex);

    return (
        <div>
            <Tab.List className="relative text-dtech-main-dark">
                {HEADERS.map((header: Header, index: number) => (
                    <TabIconHeader
                        key={index}
                        onClick={() => setSelected(index)}
                    >
                        <Image
                            src={
                                selected === index
                                    ? header.filledIcon
                                    : header.outlineIcon
                            }
                            width="36px"
                            height="36px"
                            alt={header.name}
                        />
                        <span className="text-dtech-main-dark">
                            {header.name}
                        </span>
                    </TabIconHeader>
                ))}
            </Tab.List>
        </div>
    );
};

export default TabHeaders;

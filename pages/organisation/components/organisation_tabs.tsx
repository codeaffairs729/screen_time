import { Tab } from "@headlessui/react";
import Image from "next/image";
import reportOutline from "public/images/icons/report_outline.svg";
import reportFilled from "public/images/icons/report_filled.svg";
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

const HEADERS: Header[] = [
    {
        name: "Datasets",
        outlineIcon: cascadeFolderOutline,
        filledIcon: cascadeFolderFilled,
    },
    {
        name: "Insights",
        outlineIcon: barGraphOutline,
        filledIcon: barGraphFilled,
    },
    {
        name: "Report",
        outlineIcon: reportOutline,
        filledIcon: reportFilled,
    },
];

const OrganisationTabHeaders = ({ selectedIndex = 0 }: { selectedIndex?: number }) => {
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

export default OrganisationTabHeaders;
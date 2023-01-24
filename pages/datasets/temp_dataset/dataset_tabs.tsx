import { Tab } from "@headlessui/react";
import TabIconHeader from "components/UI/tab_icon_header";
import Image from "next/image";
import { useState } from "react";
import reportOutline from "public/images/icons/report_outline.svg";
import reportFilled from "public/images/icons/report_filled.svg";
import cascadeFolderFilled from "public/images/icons/cascade_folder_filled.svg";
import barGraphOutline from "public/images/icons/bar_graph_outline.svg";
import barGraphFilled from "public/images/icons/bar_graph_filled.svg";
import DataFileOutline from "public/images/icons/data_file_outline.svg"
import UserFeedbackOutline from "public/images/icons/user_feedback_outline.svg"
import RelatedDatasetOutline from "public/images/icons/related_dataset_outline.svg"
import DataFileFilled from "public/images/icons/data_file_filled.svg"
import UserFeedbackFilled from "public/images/icons/user_feedback_filled.svg"
import RelatedDatasetFilled from "public/images/icons/related_dataset_filled.svg"
type Header = {
    name: string;
    outlineIcon: string;
    filledIcon: string;
};

const HEADERS: Header[] = [
    {
        name: "Data Files",
        outlineIcon: DataFileOutline,
        filledIcon: DataFileFilled,
    },
    {
        name: "Insights",
        outlineIcon: barGraphOutline,
        filledIcon: barGraphFilled,
    },
    {
        name: "User Feedback",
        outlineIcon: UserFeedbackOutline,
        filledIcon: UserFeedbackFilled,
    },
    {
        name: "Related Datasets",
        outlineIcon: RelatedDatasetOutline,
        filledIcon: RelatedDatasetFilled,
    },
];
const DatasetTabHeaders = ({
    selectedIndex = 0,
}: {
    selectedIndex?: number;
}) => {
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
export default DatasetTabHeaders;

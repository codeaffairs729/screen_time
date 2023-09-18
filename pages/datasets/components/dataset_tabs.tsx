import { Tab } from "@headlessui/react";
import TabIconHeader from "components/UI/tab_icon_header";
import { useEffect, useState } from "react";
import barGraphOutline from "public/images/icons/bar_graph_outline.svg";
import barGraphFilled from "public/images/icons/bar_graph_filled.svg";
import UserFeedbackOutline from "public/images/icons/user_feedback_outline.svg"
import UserFeedbackFilled from "public/images/icons/user_feedback_filled.svg"
type Header = {
    name: string;
};

const DatasetTabHeaders = ({
    selectedIndex = 0,
    headers
}: {
    selectedIndex?: number;
    headers: Header[]
}) => {
    const [selected, setSelected] = useState<number>(selectedIndex);
    useEffect(() => {
        setSelected(selectedIndex)
    }, [selectedIndex])
    return (
        <div>
            <Tab.List className="relative flex overflow-x-auto ">
                {headers.map((header: Header, index: number) => (
                    <TabIconHeader
                        key={index}
                        onClick={() => setSelected(index)}
                    >
                        <span className=" text-[16px] sm:text-lg">
                            {header.name}
                        </span>
                    </TabIconHeader>
                ))}
            </Tab.List>
        </div>
    );
};
export default DatasetTabHeaders;

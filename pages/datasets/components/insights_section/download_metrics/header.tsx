import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    getSelectedLabelIndex,
    formatLabel,
} from "pages/datasets/dataset_detail.vm";
import { useContext, useState } from "react";
import DatasetLabel from "../label";
import {
    DownloadMetricsVMContext,
    DownloadSectionEnum,
} from "./download_metric.vm";

const ITEMS: MenuItemType[] = [
    { label: "by_region" },
    { label: "by_time" },
    { label: "by_role" },
];
const DatasetDownloadMetricsHead = () => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);
    const { setSelectedDownload: onChange } = useContext(
        DownloadMetricsVMContext
    );
    const handleChange = (label: string) => {
        setSelectedLabel(label);
        onChange && onChange(getSelectedLabelIndex(label, DownloadSectionEnum));
    };
    const menuItems = ITEMS.map((item) => ({
        ...item,
        label: formatLabel(item.label),
        onClick: () => handleChange(item.label),
    }));
    return (
        <Dropdown
            label={
                <DatasetLabel
                    labelPrefix="Download Metrics"
                    label={selectedLabel}
                />
            }
            itemsClasses="rounded-[5px] shadow-none hover:!bg-dtech-light-teal hover:!text-white "
            menuItemsClasses="rounded-[5px]"
            className="border-b-[4px] font-semibold border-b-dtech-dark-teal text-dtech-dark-teal hover:!text-dtech-dark-teal"
            labelClasses="!text-xl"
            iconClass="hover:text-dtech-dark-teal text-dtech-dark-teal"
            menuItems={menuItems}
        />
    );
};
export default DatasetDownloadMetricsHead;

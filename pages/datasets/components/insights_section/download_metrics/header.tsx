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
            className="border-b-[3px] border-dtech-main-dark"
            labelClasses="!text-lg"
            menuItems={menuItems}
            label={
                <DatasetLabel
                    labelPrefix="Download metrics:"
                    label={selectedLabel}
                />
            }
            itemsClasses="rounded-[10px] shadow-none "
            menuItemsClasses="rounded-[10px]"
        />
    );
};
export default DatasetDownloadMetricsHead;

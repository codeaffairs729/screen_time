import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    DatasetDetailVMContext,
    getSelectedLabelIndex,
    formatLabel,
    download,
} from "pages/datasets/dataset_detail.vm";
import { useContext, useState } from "react";
import DatasetLabel from "../label";

const ITEMS: MenuItemType[] = [
    { label: "by_region" },
    { label: "by_time" },
    { label: "by_role" },
];
const DatasetDownloadMetricsHead = () => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);
    const { setSelectedDownload: onChange } = useContext(
        DatasetDetailVMContext
    );
    const handleChange = (label: string) => {
        setSelectedLabel(label);
        onChange && onChange(getSelectedLabelIndex(label, download));
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
        />
    );
};
export default DatasetDownloadMetricsHead;

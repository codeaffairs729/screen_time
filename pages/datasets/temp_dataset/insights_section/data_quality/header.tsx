import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    DatasetDetailVMContext,
    getSelectedLabelIndex,
    formatLabel,
    qualityInsights,
} from "pages/datasets/dataset_detail.vm";
import { useContext, useState } from "react";
import DatasetLabel from "../label";

const ITEMS: MenuItemType[] = [{ label: "data_quality" }, { label: "metadata_quality" }];

const DatasetQualityInsightsHead = () => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);
    const { setSelectedQualityInsights: onChange } = useContext(
        DatasetDetailVMContext
    );
    const handleChange = (label: string) => {
        setSelectedLabel(label);
        onChange && onChange(getSelectedLabelIndex(label, qualityInsights));
    };

    const menuItems = ITEMS.map((item) => ({
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
                    labelPrefix="Data quality"
                    label={selectedLabel}
                />
            }
        />
    );
};
export default DatasetQualityInsightsHead;

import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    getSelectedLabelIndex,
    formatLabel,
} from "pages/datasets/dataset_detail.vm";
import { useContext, useState } from "react";
import DatasetLabel from "../label";
import { QualityInsightsENUM, QualityMetricsVMContext } from "./quality_metric.vm";

const ITEMS: MenuItemType[] = [
    { label: "data" },
    { label: "metadata" },
];

const DatasetQualityInsightsHead = () => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);
    const { setSelectedQualityInsights: onChange } = useContext(
        QualityMetricsVMContext
    );
    const handleChange = (label: string) => {
        setSelectedLabel(label);
        onChange && onChange(getSelectedLabelIndex(label, QualityInsightsENUM));
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
                    labelPrefix="Dataset quality"
                    label={selectedLabel}
                />
            }
            itemsClasses="rounded-[10px] shadow-none "
            menuItemsClasses="rounded-[10px]"
        />
    );
};
export default DatasetQualityInsightsHead;

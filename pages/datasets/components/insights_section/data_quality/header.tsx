import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    getSelectedLabelIndex,
    formatLabel,
} from "pages/datasets/dataset_detail.vm";
import { useContext, useState } from "react";
import DatasetLabel from "../label";
import { QualityInsightsENUM, QualityMetricsVMContext } from "./quality_metric.vm";

const ITEMS: MenuItemType[] = [
    { label: "metadata" },
    { label: "data_file" },
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
            // className="border-b-[3px] border-dtech-main-dark"
            // labelClasses="!text-lg"
            // iconClass="hover:text-dtech-dark-teal text-dtech-dark-teal"
            // menuItems={menuItems}
            label={
                <DatasetLabel
                    labelPrefix="Dataset Quality"
                    label={selectedLabel}
                />
            }
            itemsClasses="rounded-[5px] shadow-none hover:!bg-dtech-light-teal hover:!text-white"
            menuItemsClasses="rounded-[5px] "
            className="border-b-[4px] font-semibold border-b-dtech-dark-teal text-dtech-dark-teal hover:!text-dtech-dark-teal"
            labelClasses="!text-lg"
            iconClass="hover:text-dtech-dark-teal text-dtech-dark-teal"
            menuItems={menuItems}
        />
    );
};
export default DatasetQualityInsightsHead;

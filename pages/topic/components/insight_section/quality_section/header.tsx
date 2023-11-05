import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    formatLabel,
    getSelectedLabelIndex,
} from "pages/organisation/organisation_detail.vm";

import { useContext, useState } from "react";

import Label from "../label";
import { QualityMetricVMContext, qualityInsights } from "./quality_metric.vm";

const ITEMS: MenuItemType[] = [{ label: "metadata" }, { label: "data_file" }];

const QualityInsightsHead = () => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);
    const { setSelectedQualityInsights: onChange } = useContext(
        QualityMetricVMContext
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
            className="border-b-[4px] font-semibold border-b-dtech-dark-teal text-dtech-dark-teal hover:!text-dtech-dark-teal"
            labelClasses="!text-lg"
            iconClass="hover:text-dtech-dark-teal text-dtech-dark-teal"
            menuItems={menuItems}
            label={
                <Label labelPrefix="Dataset Quality" label={selectedLabel} />
            }
            itemsClasses="rounded-[10px] shadow-none "
            menuItemsClasses="rounded-[10px]"
        />
    );
};
export default QualityInsightsHead;

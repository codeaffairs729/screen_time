import Dropdown, { MenuItemType } from "components/UI/drop_down";

import Label from "pages/organisation/components/insights_section/label";
import { useContext, useState } from "react";

const ITEMS: MenuItemType[] = [{ label: "data_file" }, { label: "metadata" }];

const DatasetQualityInsightsHead = () => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);

    const handleChange = (label: string) => {
        setSelectedLabel(label);
    };

    const menuItems = ITEMS.map((item) => ({
        label: item.label,
        onClick: () => handleChange(item.label),
    }));

    return (
        <Dropdown
            className="border-b-[3px] border-dtech-main-dark"
            labelClasses="!text-lg"
            menuItems={menuItems}
            label={
                <Label labelPrefix="Data quality" label={selectedLabel} />
            }
        />
    );
};
export default DatasetQualityInsightsHead;
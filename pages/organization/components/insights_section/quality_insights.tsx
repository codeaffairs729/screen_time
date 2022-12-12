import Dropdown, { MenuItemType } from "components/UI/drop_down";
import { useState } from "react";

const ITEMS: MenuItemType[] = [
    { label: "Data file quality" },
    { label: "Metadata quality" },
];

type QualityProps = {
    onChange?: Function;
};

const DataQualityInsights = ({ onChange }: QualityProps) => {
    const [selectedItem, setSelectedItem] = useState(ITEMS[0].label);
    const menuItems = ITEMS.map((item) => ({
        ...item,
        onClick: () => setSelectedItem(item.label),
    }));
    return (
        <Dropdown
            labelClasses="!text-lg"
            // className="!m-0"
            menuItems={menuItems}
            label={selectedItem}
        />
    );
};

export default DataQualityInsights;

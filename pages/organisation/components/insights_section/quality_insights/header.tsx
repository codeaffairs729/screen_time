import Dropdown, { MenuItemType } from "components/UI/drop_down";
import { useEffect, useState } from "react";

const ITEMS: MenuItemType[] = [{ label: "Data file" }, { label: "Metadata" }];

const QualityInsightsHead = ({ onChange }: { onChange?: Function }) => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);

    const handleChange = (item: string) => {
        setSelectedLabel(item);
        onChange && onChange(item);
    };
    const menuItems = ITEMS.map((item) => ({
        ...item,
        onClick: () => handleChange(item.label),
    }));

    return (
        <Dropdown
            className="border-b-[3px] border-dtech-main-dark"
            labelClasses="!text-lg"
            menuItems={menuItems}
            label={<Label label={selectedLabel} />}
        />
    );
};

const Label = ({ label }: { label: string }) => {
    return (
        <div className="flex select-none outline-none flex-col text-dtech-main-dark text-left">
            <span>Dataset quality:</span>
            <span>{label}</span>
        </div>
    );
};
export default QualityInsightsHead;

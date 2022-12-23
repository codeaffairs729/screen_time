import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    formatLabel,
    getSelectedLabelIndex,
    qualityInsights,
} from "pages/organisation/organisation.vm";
import { useState } from "react";

const ITEMS: MenuItemType[] = [{ label: "data_file" }, { label: "metadata" }];

const QualityInsightsHead = ({ onChange }: { onChange?: Function }) => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);

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
            label={<Label label={selectedLabel} />}
        />
    );
};

const Label = ({ label }: { label: string }) => {
    return (
        <div className="flex select-none outline-none flex-col text-dtech-main-dark text-left">
            <span>Dataset quality:</span>
            <span>{formatLabel(label)}</span>
        </div>
    );
};
export default QualityInsightsHead;

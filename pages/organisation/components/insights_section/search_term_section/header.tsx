import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    formatLabel,
    getSelectedLabelIndex,
    searchTerms,
} from "pages/organisation/organisation.vm";
import { useState } from "react";

const ITEMS: MenuItemType[] = [{ label: "top_10" }, { label: "top_25" }];

type QualityProps = {
    onChange?: Function;
};

const SearchTermHeader = ({ onChange }: QualityProps) => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);

    const handleChange = (label: string) => {
        setSelectedLabel(label);
        onChange && onChange(getSelectedLabelIndex(label, searchTerms));
    };

    const menuItems = ITEMS.map((item) => ({
        label: `${formatLabel(item.label)} terms`,
        onClick: () => handleChange(item.label),
    }));

    return (
        <Dropdown
            className="border-b-[3px] border-dtech-main-dark"
            labelClasses="!text-lg"
            // className="!m-0"
            menuItems={menuItems}
            label={<Label label={selectedLabel} />}
        />
    );
};

const Label = ({ label }: { label: string }) => {
    return (
        <div className="flex flex-col select-none outline-none text-dtech-main-dark text-left ">
            <span>Search terms used:</span>
            <span className="capitalize">{formatLabel(label)} terms</span>
        </div>
    );
};
export default SearchTermHeader;

import Dropdown, { MenuItemType } from "components/UI/drop_down";
import { useEffect, useState } from "react";

const ITEMS: MenuItemType[] = [{ label: "top_10" }, { label: "top_25" }];

type QualityProps = {
    onChange?: Function;
};

const SearchTermHeader = ({ onChange }: QualityProps) => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);

    const handleChange = (item: string) => {
        setSelectedLabel(item);
        onChange && onChange(item);
    };

    const getLabel = (label: string) => {
        const res = label.replace("_", " ");
        return `${res[0].toUpperCase()}${res.slice(1)} terms`;
    };

    const menuItems = ITEMS.map((item) => ({
        label: getLabel(item.label),
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
    const labelToShow = label.replace("_", " ");

    return (
        <div className="flex flex-col select-none outline-none text-dtech-main-dark text-left ">
            <span>Search terms used:</span>
            <span className="capitalize">{labelToShow} terms</span>
        </div>
    );
};
export default SearchTermHeader;

import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    formatLabel,
    getSelectedLabelIndex,
} from "pages/organisation/organisation_detail.vm";
import { useContext, useState } from "react";
import Label from "../label";
import { searchTerms, SearchTermVMContext } from "./search_term.vm";

const ITEMS: MenuItemType[] = [{ label: "top_10" }, { label: "top_25" }];

const SearchTermHeader = () => {
    const { setSelectedSearchTerm: onChange } = useContext(SearchTermVMContext);
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
            className="border-b-[4px] font-semibold text-dtech-dark-teal hover:!text-dtech-dark-teal border-dtech-dark-teal"
            labelClasses="!text-lg"
            // className="!m-0"
            menuItems={menuItems}
            label={
                <Label labelPrefix="Search Terms" label={selectedLabel} />
            }
            itemsClasses="rounded-[10px] shadow-none "
            menuItemsClasses="rounded-[10px]"
        />
    );
};

export default SearchTermHeader;

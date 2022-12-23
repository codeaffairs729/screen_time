import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    formatLabel,
    getSelectedLabelIndex,
    download,
} from "pages/organisation/organisation.vm";
import { useState } from "react";
import Label from "../label";

const ITEMS: MenuItemType[] = [
    { label: "by_region" },
    { label: "by_time" },
    { label: "by_user_type" },
];

type DownloadProps = {
    onChange?: Function;
};

const DownloadHeader = ({ onChange }: DownloadProps) => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);

    const handleChange = (label: string) => {
        setSelectedLabel(label);
        onChange && onChange(getSelectedLabelIndex(label, download));
    };
    const menuItems = ITEMS.map((item) => ({
        ...item,
        label: formatLabel(item.label),
        onClick: () => handleChange(item.label),
    }));
    return (
        <Dropdown
            className="border-b-[3px] border-dtech-main-dark"
            labelClasses="!text-lg"
            menuItems={menuItems}
            label={
                <Label labelPrefix="Download metrics:" label={selectedLabel} />
            }
        />
    );
};

export default DownloadHeader;

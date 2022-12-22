import Dropdown, { MenuItemType } from "components/UI/drop_down";
import { useEffect, useState } from "react";

const ITEMS: MenuItemType[] = [
    { label: "By region" },
    { label: "By time" },
    { label: "By user type" },
];

type DownloadProps = {
    onChange?: Function;
};

const DownloadHeader = ({ onChange }: DownloadProps) => {
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
            // className="!m-0"
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
export default DownloadHeader;

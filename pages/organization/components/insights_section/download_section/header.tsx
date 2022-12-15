import Dropdown, { MenuItemType } from "components/UI/drop_down";
import { useEffect, useState } from "react";

const ITEMS: MenuItemType[] = [
    { label: "By region" },
    { label: "By time" },
    { label: "By user type" },
];

type DownloadProps = {
    onChange?: Function;
    selectedLabel: string;
};

const DownloadHeader = ({ onChange, selectedLabel }: DownloadProps) => {
    const menuItems = ITEMS.map((item) => ({
        ...item,
        onClick: () => onChange && onChange(item.label),
    }));

    useEffect(() => {
        onChange && onChange(ITEMS[0].label);
    }, []);
    return (
        <Dropdown
            labelClasses="!text-lg"
            // className="!m-0"
            menuItems={menuItems}
            label={<Label label={selectedLabel} />}
        />
    );
};

const Label = ({ label }: { label: string }) => {
    return (
        <div className="flex flex-col text-dtech-main-dark text-left">
            <span>Dataset quality:</span>
            <span>{label}</span>
        </div>
    );
};
export default DownloadHeader;

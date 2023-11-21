import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    formatLabel,
    getSelectedLabelIndex,
} from "pages/organisation/organisation_detail.vm";
import { useContext, useState } from "react";
import Label from "../label";
import { DownloadMetricVMContext, downloadHeaders } from "./download_metric.vm";


const ITEMS: MenuItemType[] = [
    { label: "by_region" },
    { label: "by_time" },
    { label: "by_role" },
];

const DownloadHeader = () => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);

    const { setSelectedDownload: onChange } = useContext(
        DownloadMetricVMContext
    );
    const handleChange = (label: string) => {
        setSelectedLabel(label);
        onChange && onChange(getSelectedLabelIndex(label, downloadHeaders));
    };
    const menuItems = ITEMS.map((item) => ({
        ...item,
        label: formatLabel(item.label),
        onClick: () => handleChange(item.label),
    }));
    return (
        <Dropdown
            className="border-b-[4px] font-semibold border-b-dtech-dark-teal text-dtech-dark-teal hover:!text-dtech-dark-teal"
            labelClasses="!text-lg"
            menuItems={menuItems}
            label={
                <Label labelPrefix="Download metrics:" label={selectedLabel} />
            }
            iconClass="hover:text-dtech-dark-teal text-dtech-dark-teal"
            itemsClasses="rounded-[5px] shadow-none hover:!bg-dtech-light-teal hover:text-white"
            menuItemsClasses="rounded-[5px]"
        />
    );
};

export default DownloadHeader;

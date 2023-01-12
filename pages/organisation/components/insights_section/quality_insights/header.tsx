import Dropdown, { MenuItemType } from "components/UI/drop_down";
import {
    formatLabel,
    getSelectedLabelIndex,
    OrganisationDetailVMContext,
    qualityInsights,
} from "pages/organisation/organisation_detail.vm";
import Label from "../label";
import { useContext, useState } from "react";

const ITEMS: MenuItemType[] = [{ label: "data_file" }, { label: "metadata" }];

const QualityInsightsHead = () => {
    const [selectedLabel, setSelectedLabel] = useState(ITEMS[0].label);
    const { setSelectedQualityInsights: onChange } = useContext(
        OrganisationDetailVMContext
    );
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
            label={
                <Label labelPrefix="Dataset quality:" label={selectedLabel} />
            }
        />
    );
};
export default QualityInsightsHead;

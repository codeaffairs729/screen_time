import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const DataManagementSystem = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Data management system"
            required={false}
            tooltip={formRowToolTipData.data_management_system}
        >
            <DropdownField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "data_management_system",
                    rules: {},
                }}
                options={[
                    {
                        value: "ckan",
                        label: "CKAN",
                    },
                    {
                        value: "dkan",
                        label: "DKAN",
                    },
                    {
                        value: "arcgis",
                        label: "ArcGIS",
                    },
                    {
                        value: "other",
                        label: "Other",
                    },
                    {
                        value: "unknown",
                        label: "Unknown",
                    },
                ]}
                placeholder=""
            />
        </FormRow>
    );
};

export default DataManagementSystem;

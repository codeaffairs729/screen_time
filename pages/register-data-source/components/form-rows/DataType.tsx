import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const DataType = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Data type"
            required={false}
            tooltip={formRowToolTipData.data_type}
        >
            <DropdownField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "data_type",
                    rules: {},
                }}
                options={[
                    {
                        value: "static",
                        label: "Static",
                    },
                    {
                        value: "streaming",
                        label: "Streaming",
                    },
                    {
                        value: "mixed",
                        label: "Mixed",
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

export default DataType;

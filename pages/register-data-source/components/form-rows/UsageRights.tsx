import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const UsageRights = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Usage rights"
            required={true}
            tooltip={formRowToolTipData.usage_rights}
        >
            <DropdownField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "usage_rights",
                    rules: {
                        required: "Usage rights is required",
                    },
                    // defaultValue: "unknown",
                }}
                options={[
                    {
                        value: "open",
                        label: "Open",
                    },
                    {
                        value: "commercial",
                        label: "commercial",
                    },
                    {
                        value: "unknown",
                        label: "Don't know",
                    },
                ]}
                placeholder=""
            />
        </FormRow>
    );
};

export default UsageRights;

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
            className=" w-screen md:w-auto"
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
                        value: "semi-open",
                        label: "Semi-open",
                    },
                    {
                        value: "restricted",
                        label: "Restricted",
                    },
                    {
                        value: "closed",
                        label: "Closed",
                    },
                ]}
                placeholder=""
            />
        </FormRow>
    );
};

export default UsageRights;

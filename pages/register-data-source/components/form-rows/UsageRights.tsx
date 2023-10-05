import React from "react";
import FormRow from "../form_row";
import { ToolTipJson } from "../form_tooltip_type";
import RadioButtonField from "components/UI/form/radio_button_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const UsageRights = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Usage rights"
            required={true}
            tooltip={formRowToolTipData.usage_rights}
            className=" md:w-auto flex-col !mb-8"
            labelClass="sm:text-[19px]"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
        >
            <RadioButtonField
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
            />
        </FormRow>
    );
};

export default UsageRights;

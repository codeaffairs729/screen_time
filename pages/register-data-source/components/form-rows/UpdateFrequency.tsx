import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const UpdateFrequency = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Website update frequency"
            tooltip={formRowToolTipData.update_frequency}
        >
            <DropdownField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "update_frequency",
                    rules: {},
                }}
                options={[
                    {
                        value: "once",
                        label: "Once",
                    },
                    {
                        value: "adhoc",
                        label: "Adhoc",
                    },
                    {
                        value: "within-day",
                        label: "Within a day",
                    },
                    {
                        value: "daily",
                        label: "Daily",
                    },
                    {
                        value: "weekly",
                        label: "Weekly",
                    },
                    {
                        value: "monthly",
                        label: "Monthly",
                    },
                    {
                        value: "quaterly",
                        label: "Quaterly",
                    },
                    {
                        value: "semi-annual",
                        label: "Semi annual",
                    },
                    {
                        value: "annual",
                        label: "Annual",
                    },
                    {
                        value: "multi-year",
                        label: "Multi year",
                    },
                ]}
                placeholder=""
            />
        </FormRow>
    );
};

export default UpdateFrequency;

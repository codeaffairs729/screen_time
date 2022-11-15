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
                        value: "continually",
                        label: "Continually",
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
                        value: "fortnightly",
                        label: "Fortnightly",
                    },
                    {
                        value: "monthly",
                        label: "Monthly",
                    },
                    {
                        value: "quarterly",
                        label: "Quarterly",
                    },
                    {
                        value: "biannually",
                        label: "Bi-annually",
                    },
                    {
                        value: "annually",
                        label: "Annually",
                    },
                    {
                        value: "as-needed",
                        label: "As needed",
                    },
                    {
                        value: "irregular",
                        label: "Irregular",
                    },
                    {
                        value: "not-planned",
                        label: "Not planned",
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

export default UpdateFrequency;

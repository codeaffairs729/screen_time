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
            className="w-screen md:w-auto"

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
                        value: "ad hoc",
                        label: "Ad hoc",
                    },
                    {
                        value: "within",
                        label: "Within",
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
                        value: "quarterly",
                        label: "Quarterly",
                    },
                    {
                        value: "semi-annual",
                        label: "Semi-annual",
                    },
                    {
                        value: "annually",
                        label: "Annually",
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

export default UpdateFrequency;

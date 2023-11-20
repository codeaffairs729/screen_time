import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const UpdateFrequency = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Website management frequency"
            tooltip={formRowToolTipData.update_frequency}
            className=" md:w-auto flex-col sm:!mb-8"
            labelClass="sm:text-[19px] !justify-start"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
            tooltipClass="!ml-2"
        >
            <DropdownField
                inputClass="border-[#C3C3C3] focus:border-[#C3C3C3] focus:ring-opacity-0 rounded-[5px] sm:text-[19px]  placeholder:!text-gray-400 placeholder:!font-normal"
                newDropdownIcon={false}
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
                        label: "Within-day",
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
                placeholder="Select Website Update Frequency"
            />
        </FormRow>
    );
};

export default UpdateFrequency;

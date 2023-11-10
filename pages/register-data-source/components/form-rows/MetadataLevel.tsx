import React from "react";
import FormRow from "../form_row";
import { ToolTipJson } from "../form_tooltip_type";
import RadioButtonField from "components/UI/form/radio_button_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const MetadataLevel = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Metadata availability"
            required={true}
            tooltip={formRowToolTipData.metadata_availability}
            className=" md:w-auto flex-col sm:!mb-8"
            labelClass="sm:text-[19px] !justify-start"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
            tooltipClass="!ml-2"
        >
            <RadioButtonField
                formControl={{
                    control: vm.form.control,
                    name: "metadata_level",
                    rules: {
                        required: "Metadata availabilty info is required",
                    },
                }}
                options={[
                    {
                        value: "good",
                        label: "Good",
                    },
                    {
                        value: "sufficient",
                        label: "Sufficient",
                    },
                    {
                        value: "bad",
                        label: "Bad",
                    },
                    {
                        value: "unknown",
                        label: "Don't know",
                    },
                ]}
            />
        </FormRow>
    );
};

export default MetadataLevel;

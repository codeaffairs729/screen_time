import React from "react";
import FormRow from "../form_row";
import { ToolTipJson } from "../form_tooltip_type";
import RadioButtonField from "components/UI/form/radio_button_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const DownloadStatus = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Readily downloadable"
            required={true}
            tooltip={formRowToolTipData.downloadable_status}
            className=" md:w-auto flex-col sm:!mb-8"
            labelClass="sm:text-[19px] !justify-start"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
            tooltipClass="!ml-2"
        >
            <RadioButtonField
                formControl={{
                    control: vm.form.control,
                    name: "downloadable_status",
                    rules: {
                        required: "Downloadable info is required",
                    },
                    // defaultValue: "unknown",
                }}
                options={[
                    {
                        value: "yes",
                        label: "Yes",
                    },
                    {
                        value: "no",
                        label: "No",
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

export default DownloadStatus;

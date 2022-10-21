import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const DownloadStatus = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Readily downloadable"
            required={true}
            tooltip={formRowToolTipData.downloadable_status}
        >
            <DropdownField
                className="w-80"
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
                        label: "Unknown",
                    },
                ]}
                placeholder=""
            />
        </FormRow>
    );
};

export default DownloadStatus;

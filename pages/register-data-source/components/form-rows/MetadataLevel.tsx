import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const MetadataLevel = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Metadata availability"
            required={true}
            tooltip={formRowToolTipData.site_url}
        >
            <DropdownField
                className="w-80"
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
                placeholder=""
            />
        </FormRow>
    );
};

export default MetadataLevel;

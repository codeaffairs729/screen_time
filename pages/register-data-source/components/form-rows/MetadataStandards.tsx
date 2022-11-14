import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const MetadataStandards = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Metadata standards"
            required={false}
            tooltip={formRowToolTipData.site_url}
        >
            <DropdownField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "metadata_standards",
                    rules: {},
                }}
                options={[
                    {
                        value: "schema_org",
                        label: "Schema.org",
                    },
                    {
                        value: "scat",
                        label: "DCAT",
                    },
                    {
                        value: "other",
                        label: "Other",
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

export default MetadataStandards;

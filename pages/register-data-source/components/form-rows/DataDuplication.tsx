import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const DataDuplication = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Potential data duplication"
            tooltip={formRowToolTipData.data_duplication}
        >
            <DropdownField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "data_duplication",
                    rules: {},
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
                placeholder=""
            />
        </FormRow>
    );
};

export default DataDuplication;

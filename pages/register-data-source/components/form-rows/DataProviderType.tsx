import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const DataProviderType = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Data provider type"
            tooltip={formRowToolTipData.data_provider_type}
            className="w-screen md:w-auto"
        >
            <DropdownField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "data_provider_type",
                    rules: {},
                }}
                options={[
                    {
                        value: "host",
                        label: "Data host",
                    },
                    {
                        value: "owner",
                        label: "Data owner",
                    },
                    {
                        value: "host&owner",
                        label: "Data host & owner",
                    },
                ]}
                placeholder=""
            />
        </FormRow>
    );
};

export default DataProviderType;

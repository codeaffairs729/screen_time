import React from "react";
import FormRow from "../form_row";
import { ToolTipJson } from "../form_tooltip_type";
import RadioButtonField from "components/UI/form/radio_button_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const DataProviderType = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Data provider type"
            tooltip={formRowToolTipData.data_provider_type}
            className=" md:w-auto flex-col sm:!mb-8"
            labelClass="sm:text-[19px]"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
        >
            <RadioButtonField
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
            />
        </FormRow>
    );
};

export default DataProviderType;

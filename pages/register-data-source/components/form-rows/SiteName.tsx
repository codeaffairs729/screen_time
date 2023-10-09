import React from "react";
import FormRow from "../form_row";
import TextField from "components/UI/form/text_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const SiteName = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Organisation"
            required={true}
            tooltip={formRowToolTipData.site_name}
            className=" md:w-auto flex-col !mb-8"
            labelClass="sm:text-[19px]"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
        >
            <TextField
                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                formControl={{
                    control: vm.form.control,
                    name: "site_name",
                    rules: {
                        required: "Organisation is required",
                    },
                }}
                placeholder="Enter Organisation"
            />
        </FormRow>
    );
};

export default SiteName;

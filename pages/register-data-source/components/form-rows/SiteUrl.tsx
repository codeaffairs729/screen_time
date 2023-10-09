import React from "react";
import FormRow from "../form_row";
import TextField from "components/UI/form/text_field";
import isURL from "validator/lib/isURL";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const SiteUrl = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Data source website URL"
            required={true}
            tooltip={formRowToolTipData.site_url}
            className=" md:w-auto bg-white flex-col sm:!mb-8"
            labelClass="sm:text-[19px]"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
        >
            <TextField
                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                formControl={{
                    control: vm.form.control,
                    name: "site_url",
                    rules: {
                        required: "URL is required",
                        validate: (val: string) => {
                            if (!isURL(val)) {
                                return "Please enter a valid url";
                            }
                        },
                    },
                }}
                placeholder="Enter Data Source Website URL"
            />
        </FormRow>
        
    );
};

export default SiteUrl;

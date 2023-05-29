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
            className=" w-screen md:w-auto bg-white"
        >
            <TextField
                className="w-80"
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
                placeholder="E.g. https://healthdata.gov"
            />
        </FormRow>
        
    );
};

export default SiteUrl;

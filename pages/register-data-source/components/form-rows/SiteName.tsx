import React from "react";
import FormRow from "../form_row";
import TextField from "components/UI/form/text_field";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const SiteName = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Organisation name"
            required={true}
            tooltip={formRowToolTipData.site_name}
            className=" w-screen md:w-auto"
        >
            <TextField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "site_name",
                    rules: {
                        required: "Organisation is required",
                    },
                }}
                placeholder="E.g. US Health Department"
            />
        </FormRow>
    );
};

export default SiteName;

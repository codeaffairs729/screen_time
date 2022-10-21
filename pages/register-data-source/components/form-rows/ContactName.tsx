import React from "react";
import FormRow from "../form_row";
import TextField from "components/UI/form/text_field";
import { ToolTipJson } from "../form_tooltip_type";

const ContactName = ({ vm }: { vm: any }) => {
    return (
        <FormRow label="Contact Person">
            <TextField
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "contact_name",
                    rules: {},
                }}
                placeholder=""
            />
        </FormRow>
    );
};

export default ContactName;

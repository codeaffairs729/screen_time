import React from "react";
import FormRow from "../form_row";
import TextField from "components/UI/form/text_field";
import isEmail from "validator/lib/isEmail";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const ContactEmail = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Contact email"
            required={true}
            tooltip={formRowToolTipData.contact_email}
            className=" w-screen md:w-auto"
        >
            <TextField
                className="w-80"
                type="email"
                formControl={{
                    control: vm.form.control,
                    name: "contact_email",
                    rules: {
                        required: "Contact email is required",
                        validate: (val: string) => {
                            if (val && !isEmail(val)) {
                                return "Please enter a valid email";
                            }
                        },
                    },
                }}
                placeholder="E.g. info@healthdata.gov"
            />
        </FormRow>
    );
};

export default ContactEmail;

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
            className=" md:w-auto flex-col !mb-8"
            labelClass="sm:text-[19px]"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
        >
            <TextField
                textfieldClassName="border-black rounded-[5px] sm:text-[19px]"
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
                placeholder="Enter Contact Email"
            />
        </FormRow>
    );
};

export default ContactEmail;

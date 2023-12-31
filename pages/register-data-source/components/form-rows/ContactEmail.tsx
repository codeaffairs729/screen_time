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
            required={false}
            tooltip={formRowToolTipData.contact_email}
            className=" md:w-auto flex-col !mb-8"
            labelClass="sm:text-[19px] !justify-start"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
            tooltipClass="!ml-2"
        >
            <TextField
                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                type="email"
                formControl={{
                    control: vm.form.control,
                    name: "contact_email",
                    rules: {},
                }}
                placeholder="Enter Contact Email"
            />
        </FormRow>
    );
};

export default ContactEmail;

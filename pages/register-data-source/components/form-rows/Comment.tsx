import React from "react";
import FormRow from "../form_row";
import TextField from "components/UI/form/text_field";
// import * as formRowToolTip from "../form_tooltip.json";
import { ToolTipJson } from "../form_tooltip_type";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const Comment = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Comments"
            isTwoRow={true}
            // className="flex-col"
            tooltip={formRowToolTipData.comment}
            className=" md:w-auto flex-col"
            labelClass="sm:text-[19px] !justify-start"
            iconClass="sm:h-[19px] sm:w-[19px] text-black"
            tooltipClass="!ml-2"
        >
            <TextField
                type="textarea"
                textfieldClassName="border-[#C3C3C3] focus:border-[#C3C3C3] focus:ring-opacity-0 rounded-[5px] sm:text-[19px]"
                rows={8}
                formControl={{
                    control: vm.form.control,
                    name: "comment",
                    rules: {},
                }}
                placeholder="Other"
            />
        </FormRow>
    );
};

export default Comment;

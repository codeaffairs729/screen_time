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
            className="w-screen md:w-auto"
        >
            <TextField
                type="textarea"
                className="w-80"
                formControl={{
                    control: vm.form.control,
                    name: "comment",
                    rules: {},
                }}
                placeholder="E.g. This portal has useful documentation"
            />
        </FormRow>
    );
};

export default Comment;

import React from "react";
import FormRow from "./form_row";
import TextField from "components/UI/form/text_field";

const Comment = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Additional comments on data quality"
            isTwoRow={true}
            className="flex-col w-full"
            // tooltip={"Additional comments on data quality"}
        >
            <TextField
                rows={6}
                type="textarea"
                formControl={{
                    control: vm.form.control,
                    name: "comment",
                    rules: {},
                }}
                placeholder="Enter text here."
                textfieldClassName=" !focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
            />
        </FormRow>
    );
};

export default Comment;

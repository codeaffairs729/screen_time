import React from "react";
import FormRow from "./form_row";
import TextField from "components/UI/form/text_field";

const Comment = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Additional comments on data quality"
            isTwoRow={true}
            className="flex-col w-[400px]"
            tooltip={"Additional comments on data quality"}
        >
            <TextField
                type="textarea"
                formControl={{
                    control: vm.form.control,
                    name: "comment",
                    rules: {},
                }}
                placeholder="Additional comments on data quality"
            />
        </FormRow>
    );
};

export default Comment;

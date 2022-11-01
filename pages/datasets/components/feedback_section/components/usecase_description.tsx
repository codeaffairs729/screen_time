import React from "react";
import FormRow from "./form_row";
import TextField from "components/UI/form/text_field";

const UsecaseDescription = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Describe your data use case briefly"
            isTwoRow={true}
            className="flex-col w-[400px]"
            tooltip={"Additional comments on data quality"}
        >
            <TextField
                type="textarea"
                formControl={{
                    control: vm.form.control,
                    name: "usecase_description",
                    rules: {},
                }}
                placeholder="Additional comments on data quality"
            />
        </FormRow>
    );
};

export default UsecaseDescription;

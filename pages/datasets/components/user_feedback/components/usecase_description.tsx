import React from "react";
import FormRow from "./form_row";
import TextField from "components/UI/form/text_field";

const UsecaseDescription = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Describe your data use case briefly"
            isTwoRow={true}
            className="flex-col w-[92%]"
        >
            <TextField
                rows={6}
                type="textarea"
                formControl={{
                    control: vm.form.control,
                    name: "comment",
                    rules: {},
                }}
                placeholder="Enter text here.."
                textfieldClassName=" !focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
            />
        </FormRow>
    );
};

export default UsecaseDescription;

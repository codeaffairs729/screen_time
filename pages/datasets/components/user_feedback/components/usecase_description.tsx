import React from "react";
import FormRow from "./form_row";
import TextField from "components/UI/form/text_field";

const UsecaseDescription = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Describe your data use case briefly"
            isTwoRow={true}
            className="flex-col w-[100%]"
            labelClass="font-semibold sm:font-bold sm:text-lg text-sm text-[#333333] -mb-2 -ml-2 -mt-3"
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

import React from "react";
import FormRow from "./form_row";
import StarRating from "components/UI/form/star_rating";

const Accuracy = ({ vm }: { vm: any }) => {

    return (
        <FormRow
            label="Accuracy"
            required={true}
            tooltip={
                "Is the information (e.g. values, content) error-free and correct?"
            }
        >
            <StarRating
                formControl={{
                    control: vm.form.control,
                    name: "accuracy",
                    rules: {
                        required: "Accuracy feedback is required.",
                    },
                }}
                dontKnow={true}
                starClassName="h-6 w-6"
            />
        </FormRow>
    );
};

export default Accuracy;

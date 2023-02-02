import React from "react";
import StarRating from "components/UI/form/star_rating";
import FormRow from "./form_row";

const Consistency = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Consistency"
            required={true}
            tooltip={
                "Do the values and headers have consistent formats (e.g. date formats), granularity (e.g spatiotemporal resolution), ? Does the same information match across multiple instances?"
            }
        >
            <StarRating
                formControl={{
                    control: vm.form.control,
                    name: "consistency",
                    rules: {
                        required: "Consistency feedback is required.",
                    },
                }}
                dontKnow={true}
                starClassName="h-6 w-6"
            />
        </FormRow>
    );
};

export default Consistency;

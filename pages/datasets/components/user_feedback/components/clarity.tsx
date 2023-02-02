import React from "react";
import FormRow from "./form_row";
import StarRating from "components/UI/form/star_rating";

const Clarity = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Clarity"
            required={true}
            tooltip={
                "Is the information (headers, acronyms, abbreviations) clear (less ambiguous) and legible?"
            }
        >
            <StarRating
                formControl={{
                    control: vm.form.control,
                    name: "clarity",
                    rules: {
                        required: "Clarity feedback is required.",
                    },
                }}
                dontKnow={true}
                starClassName="h-6 w-6"
            />
        </FormRow>
    );
};

export default Clarity;

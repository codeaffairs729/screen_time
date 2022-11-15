import React from "react";
import FormRow from "./form_row";
import StarRating from "components/UI/form/star_rating";

const Readiness = ({ vm }: { vm: any }) => {
    return (
        <FormRow
            label="Readiness"
            required={true}
            tooltip={
                "Does the file need minimal preprocessing (e.g. missing value imputation, outlier removal) before any sensible use?"
            }
        >
            <StarRating
                formControl={{
                    control: vm.form.control,
                    name: "readiness",
                    rules: {
                        required: "Readiness feedback is required.",
                    },
                }}
                dontKnow={true}
            />
        </FormRow>
    );
};

export default Readiness;

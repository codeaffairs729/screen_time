import React from "react";
import FormRow from "../form_row";
import { ToolTipJson } from "../form_tooltip_type";
import DropdownFieldMulti from "components/UI/form/dropdown_field_multi";
import { useState } from "react";
import TextField from "components/UI/form/text_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

export type Option = {
    value: any;
    label: string;
};

const Domain = ({ vm }: { vm: any }) => {
    const [showOther, setShowOther] = useState(false);

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    React.useEffect(() => {
        const subscription = vm.form.watch(
            (value: any, { name, type }: { name: string; type: string }) => {
                const domain_values: Array<string> = [];
                if (value.domain) {
                    domain_values.push(...value.domain);
                }

                let other_index = domain_values.indexOf("other");
                if (name === "domain") {
                    if (other_index > -1) {
                        setShowOther(true);
                    } else {
                        setShowOther(false);
                    }
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [vm.form, vm.form.watch]);

    return (
        <>
            <FormRow
                label="Domain"
                required={true}
                tooltip={formRowToolTipData.domain}
                className=" md:w-auto flex-col sm:!mb-8"
                labelClass="sm:text-[19px]"
                iconClass="sm:h-[19px] sm:w-[19px] text-black"
            >
                <DropdownFieldMulti
                    inputfieldClassName="border-black rounded-[5px] sm:text-[19px]"
                    newDropdownIcon={true}
                    formControl={{
                        control: vm.form.control,
                        name: "domain",
                        rules: {
                            required: "Domain is required.",
                        },
                    }}
                    options={[
                        {
                            value: "environment",
                            label: "Environment",
                        },
                        {
                            value: "health",
                            label: "Health",
                        },
                        {
                            value: "transport",
                            label: "Transport",
                        },
                        {
                            value: "education",
                            label: "Education",
                        },
                        {
                            value: "finance",
                            label: "Finance",
                        },
                        {
                            value: "energy",
                            label: "Energy",
                        },
                        {
                            value: "employment",
                            label: "Employment",
                        },
                        {
                            value: "other",
                            label: "Other",
                        },
                    ]}
                    placeholder="Select Domains"
                />
            </FormRow>
            {showOther && (
                <div>
                    <FormRow
                        label="Domain (other)"
                        tooltip={formRowToolTipData.domain_other}
                        required={true}
                        className=" md:w-auto flex-col sm:!mb-8"
                        labelClass="sm:text-[19px]"
                        iconClass="sm:h-[19px] sm:w-[19px] text-black"
                    >
                        <TextField
                            textfieldClassName="border-black rounded-[5px] sm:text-[19px]"
                            formControl={{
                                control: vm.form.control,
                                name: "domain_other",
                                rules: {
                                    required: "Domain(other) is required.",
                                },
                            }}
                            placeholder="E.g. https://healthdata.gov/sitemap"
                        />
                    </FormRow>
                </div>
            )}
        </>
    );
};

export default Domain;

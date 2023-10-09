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
                    inputfieldClassName="rounded-[5px] sm:text-[19px] border-[#C3C3C3] focus:border-[#C3C3C3] focus:ring-opacity-0"
                    newDropdownIcon={true}
                    formControl={{
                        control: vm.form.control,
                        name: "domain",
                        rules: {
                            required: "Domain is required.",
                        },
                    }}
                    options={[
                        { value: "envnat", label: "Environment and nature" },
                        { value: "govpub", label: "Government and public sector" },
                        { value: "hlthcare", label: "Health and care" },
                        { value: "popsoc", label: "Population and society" },
                        { value: "agrfisfor", label: "Agriculture, fisheries and forestry" },
                        { value: "busecofin", label: "Business, economics and finance" },
                        { value: "culsprt", label: "Culture, leisure and sport" },
                        { value: "crimjus", label: "Crime and justice" },
                        { value: "edu", label: "Education" },
                        { value: "engy", label: "Energy" },
                        { value: "geo", label: "Geography" },
                        { value: "sctech", label: "Science and technology" },
                        { value: "trinfra", label: "Transport and infrastructure" },
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
                            textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
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

import React from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
import { useState } from "react";
import TextField from "components/UI/form/text_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");

const DataType = ({ vm }: { vm: any }) => {
    const [showOther, setShowOther] = useState(false);

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    React.useEffect(() => {
        const subscription = vm.form.watch(
            (value: any, { name, type }: { name: string; type: string }) => {
                // const domain_values = [...value.domain];
                const domain_values = JSON.parse(
                    JSON.stringify([...value.domain])
                );

                let other_index = domain_values.indexOf("other");
                if (name === "data_type") {
                    if (other_index != -1) {
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
                label="Data type"
                required={false}
                tooltip={formRowToolTipData.data_type}
            >
                <DropdownField
                    className="w-80"
                    formControl={{
                        control: vm.form.control,
                        name: "data_type",
                        rules: {},
                    }}
                    options={[
                        {
                            value: "static",
                            label: "Static",
                        },
                        {
                            value: "streaming",
                            label: "Streaming",
                        },
                        {
                            value: "mixed",
                            label: "Mixed",
                        },
                        {
                            value: "other",
                            label: "Other",
                        },
                        {
                            value: "unknown",
                            label: "Don't know",
                        },
                    ]}
                    placeholder=""
                />
            </FormRow>
            <div className={`${showOther ? "" : "hidden"}`}>
                <FormRow
                    label="Other domain(s)"
                    tooltip={formRowToolTipData.domain_other}
                >
                    <TextField
                        className="w-80"
                        formControl={{
                            control: vm.form.control,
                            name: "domain_other",
                            rules: {},
                        }}
                        placeholder="E.g. https://healthdata.gov/sitemap"
                    />
                </FormRow>
            </div>
        </>
    );
};

export default DataType;

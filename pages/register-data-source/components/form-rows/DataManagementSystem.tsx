import React, { useState } from "react";
import FormRow from "../form_row";
import DropdownField from "components/UI/form/dropdown_field";
import { ToolTipJson } from "../form_tooltip_type";
import TextField from "components/UI/form/text_field";
const formRowToolTipData: ToolTipJson = require("../form_tooltip.json");
const DataManagementSystem = ({ vm }: { vm: any }) => {
    const [showOther, setShowOther] = useState(false);

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    React.useEffect(() => {
        const subscription = vm.form.watch(
            (value: any, { name, type }: { name: string; type: string }) => {
                if (value.data_management_system) {
                    const data_management_system_values: string =
                        value.data_management_system;
                    if (name === "data_management_system") {
                        if (data_management_system_values == "other") {
                            setShowOther(true);
                        } else {
                            setShowOther(false);
                        }
                    }
                }
            }
        );
        return () => subscription.unsubscribe();
    }, [vm.form, vm.form.watch]);

    return (
        <>
            <FormRow
                label="Data management system"
                required={false}
                tooltip={formRowToolTipData.data_management_system}
                className="w-screen md:w-auto"
            >
                <DropdownField
                    className="w-80"
                    formControl={{
                        control: vm.form.control,
                        name: "data_management_system",
                        rules: {},
                    }}
                    options={[
                        {
                            value: "arcgis",
                            label: "ArcGIS",
                        },
                        {
                            value: "ckan",
                            label: "CKAN",
                        },
                        {
                            value: "dkan",
                            label: "DKAN",
                        },
                        {
                            value: "data_mill",
                            label: "Data Mill",
                        },
                        {
                            value: "edp",
                            label: "EDP",
                        },
                        {
                            value: "opendatasoft",
                            label: "OpenDataSoft",
                        },
                        {
                            value: "publishMyData",
                            label: "PublishMyData",
                        },
                        {
                            value: "socrata",
                            label: "Socrata",
                        },
                        {
                            value: "usmart",
                            label: "uSmart",
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
                    label="Data management system (other)"
                    tooltip={formRowToolTipData.data_management_system_other}
                >
                    <TextField
                        className="w-80"
                        formControl={{
                            control: vm.form.control,
                            name: "data_management_system_other",
                            rules: {},
                        }}
                        placeholder="E.g. https://healthdata.gov/sitemap"
                    />
                </FormRow>
            </div>
        </>
    );
};

export default DataManagementSystem;

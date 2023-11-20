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
                className=" md:w-auto flex-col sm:!mb-8"
                labelClass="sm:text-[19px] !justify-start"
                iconClass="sm:h-[19px] sm:w-[19px] text-black"
                tooltipClass="!ml-2"
            >
                <DropdownField
                    inputClass="border-[#C3C3C3] focus:border-[#C3C3C3] focus:ring-opacity-0 rounded-[5px] sm:text-[19px]  placeholder:!text-gray-400 placeholder:!font-normal"
                    newDropdownIcon={false}
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
                    placeholder="Select Data Management System"
                />
            </FormRow>
            <div className={`${showOther ? "" : "hidden"}`}>
                <FormRow
                    label="Data management system (other)"
                    tooltip={formRowToolTipData.data_management_system_other}
                    className=" md:w-auto flex-col sm:!mb-8"
                    labelClass="sm:text-[19px]"
                    iconClass="sm:h-[19px] sm:w-[19px] text-black"
                >
                    <TextField
                        textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
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

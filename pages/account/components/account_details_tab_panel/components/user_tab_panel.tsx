import { Tab } from "@headlessui/react";
import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import Image from "next/image";
import { useForm } from "react-hook-form";

const UserTabPanel = () => {
    const { control } = useForm();
    return (
        <Tab.Panel className="flex items-center space-x-4">
            <div className="w-52 p-3 relative mx-auto">
                <Image
                    src="/images/icons/profile/guest_Icon.svg"
                    width="40"
                    height="40"
                    layout="responsive"
                    alt="profile img"
                />
                <PrimaryBtn
                    className="bg-dtech-secondary-dark"
                    label="Upload photo"
                />
            </div>
            <div className="w-full">
                <FormRow label="Name">
                    <TextField
                        className="bg-gray-50"
                        formControl={{
                            control: control,
                            name: "name",
                            rules: { required: "Name is required" },
                        }}
                        placeholder="Name"
                    />
                </FormRow>
                <FormRow label="Email">
                    <TextField
                        className="bg-gray-50"
                        formControl={{
                            control: control,
                            name: "email",
                            rules: { required: "Email is required" },
                        }}
                        placeholder="Email"
                    />
                </FormRow>
                <FormRow label="Organisation">
                    <TextField
                        className="bg-gray-50"
                        formControl={{
                            control: control,
                            name: "organisation",
                            rules: { required: "Organisation is required" },
                        }}
                        placeholder="Organisation"
                    />
                </FormRow>
                <FormRow label="Role">
                    <TextField
                        className="bg-gray-50"
                        formControl={{
                            control: control,
                            name: "role",
                            rules: { required: "Role is required" },
                        }}
                        placeholder="Role"
                    />
                </FormRow>
                <FormRow label="Data Owner">
                    <TextField
                        className="bg-gray-50"
                        formControl={{
                            control: control,
                            name: "data_owner",
                            rules: { required: "Data Owner is required" },
                        }}
                        placeholder="Data Owner"
                    />
                </FormRow>
                <FormRow label="Data Owner">
                    <DropdownField
                        className=""
                        placeholder="Choose whether data owner"
                        options={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                        dataSelector="data-owner-dropdown"
                        formControl={{
                            control: control,
                            name: "is_data_owner",
                            rules: {
                                validate: (val: boolean) => {
                                    if (![true, false].includes(val)) {
                                        return "Data owner is required";
                                    }
                                },
                            },
                        }}
                    />
                </FormRow>
                <FormRow label="Admin">
                    <DropdownField
                        className=""
                        placeholder="Choose whether data owner"
                        options={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                        dataSelector="admin-dropdown"
                        formControl={{
                            control: control,
                            name: "is_admin",
                            rules: {
                                validate: (val: boolean) => {
                                    if (![true, false].includes(val)) {
                                        return "Admin is required";
                                    }
                                },
                            },
                        }}
                    />
                </FormRow>
            </div>
        </Tab.Panel>
    );
};

export default UserTabPanel;

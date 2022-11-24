import { Tab } from "@headlessui/react";
import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import User from "models/user.model";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "store";
import UserTabPanelVM from "./user_tab_panel.vm";

const UserTabPanel = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { control, handleSubmit } = useForm();
    const vm = UserTabPanelVM();

    return (
        <Tab.Panel className="flex items-center space-x-4">
            {/* <div className="w-52 p-3 relative mx-auto">
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
            </div> */}
            <div className="w-full">
                <FormRow label="Name">
                    <TextField
                        className="bg-gray-50"
                        formControl={{
                            control: control,
                            name: "name",
                            defaultValue: user?.name,
                            rules: { required: "Name is required" },
                        }}
                        placeholder="Name"
                    />
                </FormRow>
                <FormRow label="Email">
                    <TextField
                        className="bg-gray-50"
                        disabled={true}
                        formControl={{
                            control: control,
                            name: "email",
                            defaultValue: user?.email,
                            rules: { required: "Email is required" },
                        }}
                        placeholder="Email"
                    />
                </FormRow>
                <FormRow label="Organisation">
                    <TextField
                        className="bg-gray-50"
                        disabled={true}
                        formControl={{
                            control: control,
                            name: "organisation",
                            defaultValue: user?.organisation,
                            rules: { required: "Organisation is required" },
                        }}
                        placeholder="Organisation"
                    />
                </FormRow>
                <FormRow label="Role">
                    <DropdownField
                        // className="w-60"
                        placeholder="Please select your role"
                        options={vm.roleOptions}
                        dataSelector="role-dropdown"
                        formControl={{
                            control: control,
                            defaultValue: user?.role,
                            name: "role",
                            rules: { required: "Role is required" },
                        }}
                    />
                </FormRow>
                {/* <FormRow label="Data Owner">
                    <DropdownField
                        className=""
                        placeholder="Choose whether data owner"
                        options={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                        formControl={{
                            control: control,
                            name: "is_data_owner",
                            defaultValue: user?.isDataOwner,
                            rules: {
                                validate: (val: boolean) => {
                                    if (![true, false].includes(val)) {
                                        return "Data owner is required";
                                    }
                                },
                            },
                        }}
                    />
                </FormRow> */}
                {/* <FormRow label="Admin">
                    <DropdownField
                        className=""
                        placeholder="Choose whether admin"
                        options={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                        formControl={{
                            control: control,
                            defaultValue: User.isOrgAdmin(user),
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
                </FormRow> */}
                <PrimaryBtn
                    className="bg-dtech-secondary-dark w-min whitespace-nowrap ml-auto"
                    label="Update"
                    isLoading={vm.isSavingUserDetails}
                    onClick={handleSubmit(vm.saveUserDetails)}
                />
            </div>
        </Tab.Panel>
    );
};

export default UserTabPanel;

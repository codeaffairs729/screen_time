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
    const vm = UserTabPanelVM();
    // console.log('watch("role")', watch("role"));

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
                            control: vm.form.control,
                            name: "name",
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
                            control: vm.form.control,
                            name: "email",
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
                            control: vm.form.control,
                            name: "organisation",
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
                            control: vm.form.control,
                            name: "role",
                            rules: { required: "Role is required" },
                        }}
                    />
                </FormRow>
                {vm.form.watch("role") == "other" && (
                    <FormRow label="Role Other">
                        <TextField
                            className="bg-gray-50"
                            formControl={{
                                control: vm.form.control,
                                name: "role_other",
                                rules: {
                                    required: "Role Other is required",
                                },
                            }}
                            placeholder="Role Other"
                        />
                    </FormRow>
                )}
                <PrimaryBtn
                    className="bg-dtech-secondary-dark w-min whitespace-nowrap ml-auto"
                    label="Update"
                    isLoading={vm.isSavingUserDetails}
                    onClick={vm.form.handleSubmit(vm.saveUserDetails)}
                />
            </div>
        </Tab.Panel>
    );
};

export default UserTabPanel;

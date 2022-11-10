import { Tab } from "@headlessui/react";
import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import TextField from "components/UI/form/text_field";
import Image from "next/image";
import { useForm } from "react-hook-form";
import MembersTable from "./members_table";
import { BsCardImage } from "react-icons/bs";
import PrimaryBtn from "components/UI/form/primary_btn";
import AddMemberModal from "./add_member_modal";
import AdminTabPanelVM, { AdminTabPanelVMContext } from "./admin_tab_panel.vm";
import User from "models/user.model";
import { RootState } from "store";
import { useSelector } from "react-redux";

const AdminTabPanel = () => {
    const { control, handleSubmit } = useForm();
    const admin_user = useSelector((state: RootState) => state.auth.user);
    const vm = AdminTabPanelVM();
    return (
        <Tab.Panel>
            <AdminTabPanelVMContext.Provider value={vm}>
                <div className="flex items-center space-x-4">
                    {/* <div className="w-52 p-3 relative mx-auto text-center">
                        <BsCardImage className="w-full text-9xl text-gray-500" />
                        <PrimaryBtn
                            className="bg-dtech-secondary-dark"
                            label="Upload logo"
                        />
                    </div> */}
                    <div className="w-full">
                        <FormRow label="Organisation">
                            <TextField
                                className="bg-gray-50"
                                formControl={{
                                    control: control,
                                    name: "name",
                                    defaultValue:
                                        User.getOrganisation(admin_user)?.name,
                                    rules: {
                                        required: "Organisation is required",
                                    },
                                }}
                                placeholder="Organisation"
                            />
                        </FormRow>
                        <FormRow label="Sector">
                            <DropdownField
                                className=""
                                placeholder="Sector"
                                options={[
                                    {
                                        value: "public_sector",
                                        label: "Public Sector",
                                    },
                                    {
                                        value: "private_sector",
                                        label: "Private Sector",
                                    },
                                    {
                                        value: "third_sector",
                                        label: "Third Sector",
                                    },
                                ]}
                                formControl={{
                                    control: control,
                                    defaultValue:
                                        User.getOrganisation(admin_user)
                                            ?.sector,
                                    name: "sector",
                                    rules: {
                                        required: "Sector is required",
                                    },
                                }}
                            />
                        </FormRow>
                        <FormRow label="Max. members">
                            <TextField
                                className="bg-gray-50"
                                formControl={{
                                    control: control,
                                    defaultValue:
                                        User.getOrganisation(admin_user)
                                            ?.maxMembers,
                                    name: "max_members",
                                    rules: {
                                        required: "Max. members is required",
                                    },
                                }}
                                placeholder="Max. members"
                            />
                        </FormRow>
                        <PrimaryBtn
                            className="bg-dtech-secondary-dark w-min whitespace-nowrap ml-auto"
                            label="Update"
                            isLoading={vm.isSavingOrgDetails}
                            onClick={handleSubmit(vm.saveOrgDetails)}
                        />
                    </div>
                </div>
                <h3 className="text-sm text-gray-500 font-medium border-b border-gray-400 mt-6">
                    Members
                </h3>
                <MembersTable />
                <PrimaryBtn
                    className="bg-dtech-secondary-dark w-min whitespace-nowrap"
                    label="Add member"
                    onClick={() => vm.setIsAddMemberModalOpen(true)}
                />
                <AddMemberModal
                    isOpen={vm.isAddMemberModalOpen}
                    setIsOpen={vm.setIsAddMemberModalOpen}
                />
            </AdminTabPanelVMContext.Provider>
        </Tab.Panel>
    );
};

export default AdminTabPanel;

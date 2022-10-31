import { Tab } from "@headlessui/react";
import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import TextField from "components/UI/form/text_field";
import Image from "next/image";
import { useForm } from "react-hook-form";
import MembersTable from "./members_table";
import { BsCardImage } from "react-icons/bs";
import PrimaryBtn from "components/UI/form/primary_btn";

const AdminTabPanel = () => {
    const { control } = useForm();
    return (
        <Tab.Panel>
            <div className="flex items-center space-x-4">
                <div className="w-52 p-3 relative mx-auto text-center">
                    <BsCardImage className="w-full text-9xl text-gray-500" />
                    <PrimaryBtn
                        className="bg-dtech-secondary-dark"
                        label="Upload logo"
                    />
                </div>
                <div className="w-full">
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
                                name: "sector",
                                rules: {},
                            }}
                        />
                    </FormRow>
                    <FormRow label="Max. members">
                        <TextField
                            className="bg-gray-50"
                            formControl={{
                                control: control,
                                defaultValue: "250",
                                name: "max_members",
                                rules: { required: "Max. members is required" },
                            }}
                            placeholder="Max. members"
                        />
                    </FormRow>
                </div>
            </div>
            <h3 className="text-sm text-gray-500 font-medium border-b border-gray-400 mt-6">
                Members
            </h3>
            <MembersTable />
        </Tab.Panel>
    );
};

export default AdminTabPanel;

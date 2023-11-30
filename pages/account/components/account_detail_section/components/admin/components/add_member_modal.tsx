import { Dialog, Transition } from "@headlessui/react";
import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import _ from "lodash";
import { Fragment, useContext } from "react";
import isEmail from "validator/lib/isEmail";
import { AdminTabPanelVMContext } from "../admin_tab_panel.vm";
import RadioButtonField from "components/UI/form/radio_button_field";

function AddMemberModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) {
    const vm = useContext(AdminTabPanelVMContext);
    console.log("AddMemberModal");

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform rounded-lg bg-white p-10 px-12 text-left align-middle shadow-xl transition-all ">
                                <Dialog.Title className="w-min mx-auto text-gray-700 whitespace-nowrap mb-4 font-semibold">
                                    {/* <h3 className="w-min mx-auto text-gray-700 whitespace-nowrap mb-4 font-semibold"> */}
                                    Add member
                                    {/* </h3> */}
                                </Dialog.Title>
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <FormRow
                                            label="Email"
                                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                                            labelClass="sm:text-[19px]"
                                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                                        >
                                            <TextField
                                                formControl={{
                                                    control: vm.control,
                                                    name: "email",
                                                    rules: {
                                                        required:
                                                            "Email is required",
                                                        validate: (
                                                            val: string
                                                        ) => {
                                                            if (!isEmail(val)) {
                                                                return "Please enter a valid email";
                                                            }
                                                        },
                                                    },
                                                }}
                                                placeholder="Example: jane@company.com"
                                                type="email"
                                                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                                            />
                                        </FormRow>
                                    </div>
                                    <div className="mt-2">
                                        <FormRow
                                            label="Permission"
                                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                                            labelClass="sm:text-[19px]"
                                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                                        >
                                            <RadioButtonField
                                                radioClass= " flex justify-between items-center pr-32"
                                                formControl={{
                                                    control: vm.control,
                                                    name: "roles",
                                                    rules: {
                                                        required:
                                                            "Permissions is required",
                                                    },
                                                }}
                                                options={[
                                                    {
                                                        label: "Member",
                                                        value: "essential_subscriber",
                                                    },
                                                    {
                                                        label: "Admin",
                                                        value: "organisation_administrator",
                                                    },
                                                ]}
                                            />
                                            {/* <DropdownField
                                                inputClass=" !focus:ring-dtech-main-dark border-1 !border-dtech-main-dark !focus:border-dtech-main-dark !bg-transparent"
                                                placeholder="Choose whether member or admin"
                                                options={[
                                                    {
                                                        label: "Member",
                                                        value: "Organisation Member",
                                                    },
                                                    {
                                                        label: "Admin",
                                                        value: "Organisation Admin",
                                                    },
                                                ]}
                                                dataSelector="data-owner-dropdown"
                                                formControl={{
                                                    control: vm.control,
                                                    name: "roles",
                                                    rules: {
                                                        required:
                                                            "Permissions is required",
                                                    },
                                                }}
                                           /> */}
                                        </FormRow>
                                    </div>
                                </div>
                                <div className="text-center mt-2">
                                    <PrimaryBtn
                                        className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-min whitespace-nowrap  !px-16  !py-2 !rounded-lg !text-sm mx-auto"
                                        label="Invite"
                                        isLoading={vm.isInvitingMember}
                                        onClick={vm.handleSubmit(
                                            async (data: any) => {
                                                await vm.inviteMember({
                                                    ...data,
                                                    roles: data["roles"],
                                                });
                                            }
                                        )}
                                    />
                                    {/* <p className="text-center text-xs text-red-700 mt-4">
                                        An email invite has been sent.
                                    </p> */}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default AddMemberModal;

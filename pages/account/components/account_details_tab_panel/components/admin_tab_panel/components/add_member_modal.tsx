import { Dialog, Transition } from "@headlessui/react";
import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import _ from "lodash";
import { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { AdminTabPanelVMContext } from "../admin_tab_panel.vm";

function AddMemberModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) {
    console.log("isOpen", isOpen);
    const { control, handleSubmit, reset } = useForm();
    const vm = useContext(AdminTabPanelVMContext);

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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded bg-white p-6 px-12 text-left align-middle shadow-xl transition-all border border-dtech-secondary-dark">
                                <Dialog.Title>
                                    <h3 className="w-min mx-auto text-gray-700 whitespace-nowrap mb-4 font-semibold">
                                        Add member
                                    </h3>
                                </Dialog.Title>

                                <FormRow label="Email">
                                    <TextField
                                        // className="w-60"
                                        formControl={{
                                            control: control,
                                            name: "email",
                                            rules: {
                                                required: "Email is required",
                                                validate: (val: string) => {
                                                    if (!isEmail(val)) {
                                                        return "Please enter a valid email";
                                                    }
                                                },
                                            },
                                        }}
                                        placeholder="Email"
                                        type="email"
                                    />
                                </FormRow>
                                <FormRow label="Permission">
                                    <DropdownField
                                        // className="w-60"
                                        placeholder="Choose whether data owner"
                                        options={[
                                            {
                                                label: "Organization Member",
                                                value: "Organization Member",
                                            },
                                            // {
                                            //     label: "Registered User",
                                            //     value: "Registered User",
                                            // },
                                        ]}
                                        dataSelector="data-owner-dropdown"
                                        formControl={{
                                            control: control,
                                            name: "roles",
                                            rules: {
                                                required:
                                                    "Permissions is required",
                                            },
                                        }}
                                    />
                                </FormRow>
                                <div className="text-center">
                                    <PrimaryBtn
                                        className="bg-dtech-secondary-dark w-min mx-auto"
                                        label="Invite"
                                        onClick={handleSubmit(async (data) => {
                                            await vm.inviteMember({
                                                ...data,
                                                roles: [data["roles"]],
                                            });
                                            // reset();
                                        })}
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

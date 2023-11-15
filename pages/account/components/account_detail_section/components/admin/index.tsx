import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "store";
import AdminTabPanelVM, { AdminTabPanelVMContext } from "./admin_tab_panel.vm";
import User from "models/user.model";
import Image from "next/image";
import cameraImage from "public/images/icons/camera_filled.svg";
import plusWhite from "public/images/icons/plus_white.svg";
import AddMemberModal from "./components/add_member_modal";
import MembersTable from "./components/members_table";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";
import RadioButtonField from "components/UI/form/radio_button_field";
const AdminSection = () => {
    // const { control, handleSubmit } = useForm();
    const user = useSelector((state: RootState) => state.auth.user);
    const admin_user = useSelector((state: RootState) => state.auth.user);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const vm = AdminTabPanelVM();
    const nameInitial = user
        ? user?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
        : "G";
    const handleFileChange = (e: any) => {
        // setFile(e.target.files[0]);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            vm.setFile(reader?.result as string);
        };
        reader.readAsDataURL(file);
    };
    const uploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="pt-16">
            <AdminTabPanelVMContext.Provider value={vm}>
                <div className="flex flex-col justify-between items-center max-w-3xl md:mx-auto mx-2">
                    <div className="relative w-40 flex justify-center items-end">
                        <div
                            className={`select-none  outline-none text-lg w-32 h-32 flex justify-center items-center rounded-full text-[#F5F5F5] font-medium text-[96px]`}
                        >
                            {vm.file ? (
                                <div className="p-2 flex flex-col justify-center items-center overflow-hidden rounded-full w-32 h-32">
                                    <img
                                        src={vm.file}
                                        className="w-28 h-28 object-contain"
                                    ></img>
                                </div>
                            ) : (
                                <BiUserCircle className=" w-32 h-32 text-[#c3c3c3]" />
                            )}
                        </div>

                        <div
                            className=" absolute  cursor-pointer right-0"
                            onClick={() => {
                                uploadImage();
                            }}
                        >
                            <div>
                                <input
                                    id="image-upload"
                                    ref={fileInputRef}
                                    // {...register}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                ></input>
                                <Image
                                    src={cameraImage}
                                    width="30px"
                                    height="30px"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <FormRow
                            label="Organisation"
                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                            labelClass="sm:text-[19px]"
                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                            required
                        >
                            <TextField
                                className="bg-gray-50"
                                disabled={false}
                                formControl={{
                                    control: vm.form.control,
                                    name: "name",
                                    defaultValue:
                                        User.getOrganisation(admin_user)?.name,
                                    // "",
                                    rules: {
                                        required: "Organisation is required",
                                    },
                                }}
                                placeholder="Organisation"
                                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                            />
                        </FormRow>
                        <FormRow
                            label="Sector"
                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                            labelClass="sm:text-[19px]"
                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                        >
                            <RadioButtonField
                                formControl={{
                                    control: vm.form.control,
                                    defaultValue:
                                        User.getOrganisation(admin_user)
                                            ?.sector,
                                    name: "sector",
                                    rules: {
                                        required: "Sector is required",
                                    },
                                }}
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
                            />
                            {/* <DropdownField
                                inputClass=" !focus:ring-dtech-main-dark border-1 !border-dtech-main-dark !focus:border-dtech-main-dark !bg-transparent"
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
                                    control: vm.form.control,
                                    defaultValue:
                                        User.getOrganisation(admin_user)
                                            ?.sector,
                                    name: "sector",
                                    rules: {
                                        required: "Sector is required",
                                    },
                                }}
                            /> */}
                        </FormRow>
                        <FormRow
                            label="Max Members"
                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                            labelClass="sm:text-[19px]"
                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                            required
                        >
                            <TextField
                                className="bg-gray-100"
                                disabled={false}
                                formControl={{
                                    control: vm.form.control,
                                    defaultValue:
                                        User.getOrganisation(admin_user)
                                            ?.maxMembers,
                                    name: "max_members",
                                    rules: {
                                        required: "Max. members is required",
                                    },
                                }}
                                placeholder="role"
                                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                            />
                        </FormRow>
                    </div>

                    <div className="mt-5 w-full">
                        <PrimaryBtn
                            className="dtech-new-main-light bg-white border-2 border-dtech-new-main-light w-min whitespace-nowrap  !px-10  !py-2 !rounded-full !text-lg  !text-dtech-new-main-light"
                            label="Add member"
                            onClick={() => vm.setIsAddMemberModalOpen(true)}
                        />

                        <AddMemberModal
                            isOpen={vm.isAddMemberModalOpen}
                            setIsOpen={vm.setIsAddMemberModalOpen}
                        />
                        <MembersTable className="max-w-5xl ml-auto w-full overflow-x-auto" />
                        <PrimaryBtn
                            className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-min whitespace-nowrap  !px-16 !py-2 !rounded-full !text-lg mt-8"
                            label="Update"
                            isLoading={vm.isSavingOrgDetails}
                            onClick={() => {
                                if (
                                    vm.form.getValues().name !==
                                        User.getOrganisation(admin_user)
                                            ?.name ||
                                    vm.form.getValues().sector !==
                                        User.getOrganisation(admin_user)
                                            ?.sector ||
                                    vm.file != user?.logo_url
                                ) {
                                    vm.form.handleSubmit(() => {
                                        const formData = new FormData();
                                        formData.append(
                                            "name",
                                            vm.form.getValues().name
                                        );
                                        formData.append(
                                            "sector",
                                            vm.form.getValues().sector
                                        );
                                        formData.append("image", vm.file || "");
                                        vm.saveOrgDetails({
                                            ...vm.form.getValues(),
                                            image: vm.file,
                                        });
                                    })();
                                } else {
                                    toast.error(
                                        "There is not any change in the form"
                                    );
                                }
                            }}
                        />
                    </div>
                </div>
            </AdminTabPanelVMContext.Provider>
        </div>
    );
};

export default AdminSection;

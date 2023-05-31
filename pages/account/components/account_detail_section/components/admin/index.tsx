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
const AdminSection = () => {
    // const { control, handleSubmit } = useForm();
    const user = useSelector((state: RootState) => state.auth.user);
    const [file, setFile] = useState(user?.logo_url);
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
            setFile(reader?.result as string);
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
                <div className="lg:flex flex-row justify-between items-center max-w-3xl mx-auto">
                <div>
                    <div
                        className=" absolute ml-[80px] mt-[-15px] cursor-pointer"
                        onClick={() => {
                            uploadImage();
                        }}
                    ><div>
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
                                width="40px"
                                height="40px"
                            /></div>
                    </div>
                    <div className={`${!file&&"bg-dtech-middle-grey"} "select-none  outline-none text-lg w-28 h-28 flex justify-center items-center rounded-full text-[#F5F5F5] font-medium text-[96px] mb-4 pb-6"`}>
                        {file ? <img src={file} className="rounded-full"></img> : `${nameInitial}`}
                    </div>
                </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormRow
                            label="Organisation"
                            labelClass="!bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-dtech-main-dark !py-1"
                        >
                            <TextField
                                className="bg-gray-50"
                                disabled={false}
                                formControl={{
                                    control: vm.form.control,
                                    name: "name",
                                    defaultValue:User.getOrganisation(admin_user)?.name,
                                        // "",
                                    rules: {
                                        required: "Organisation is required",
                                    },
                                }}
                                placeholder="Organisation"
                                textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                            />
                        </FormRow>
                        <FormRow
                            label="Sector"
                            labelClass="!bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-dtech-main-dark !py-1"
                        >
                            <DropdownField
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
                                    defaultValue:User.getOrganisation(admin_user)?.sector,
                                    name: "sector",
                                    rules: {
                                        required: "Sector is required",

                                    },
                                }}
                            />
                        </FormRow>
                        <FormRow
                            label="Max Members"
                            labelClass="!bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-dtech-main-dark !py-1"
                        >
                            <TextField
                                className="bg-gray-100"
                                // disabled={false}
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
                                textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                            />
                        </FormRow>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center mt-5 cursor-pointer">
                    <div className=" absolute mr-[12rem] mt-1.5 ">
                        <Image src={plusWhite} />
                    </div>
                    <PrimaryBtn
                        className="bg-dtech-main-dark w-min whitespace-nowrap  !px-16  !py-2 !rounded-lg !text-lg"
                        label="Add member"
                        onClick={() => vm.setIsAddMemberModalOpen(true)}
                    />
                </div>
                <div className="flex flex-col">
                    <AddMemberModal
                        isOpen={vm.isAddMemberModalOpen}
                        setIsOpen={vm.setIsAddMemberModalOpen}
                    />
                    <MembersTable className="max-w-5xl ml-auto w-full overflow-x-auto" />
                    <div className=" flex justify-end items-end">
                        <PrimaryBtn
                            className="bg-dtech-main-dark w-min whitespace-nowrap  !px-16 !py-2 !rounded-lg !text-lg"
                            label="Update"
                            isLoading={vm.isSavingOrgDetails}
                            onClick={() => {
                                file!=user?.logo_url?
                                vm.form.handleSubmit(() => {
                                    const formData = new FormData();
                                    formData.append("name", vm.form.getValues().name);
                                    formData.append("sector", vm.form.getValues().sector);
                                    formData.append("image", file || "");
                                    vm.saveOrgDetails({
                                        ...vm.form.getValues(),
                                        image: file,
                                    });
                                })():toast.error("Please change the image")
                            }}
                        />
                    </div>
                </div>
            </AdminTabPanelVMContext.Provider>
        </div>
    );
};

export default AdminSection;

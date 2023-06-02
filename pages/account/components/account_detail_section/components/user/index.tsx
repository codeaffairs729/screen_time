import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import Image from "next/image";
import UserTabPanelVM from "./user_tab_panel.vm";
import cameraImage from "public/images/icons/camera_filled.svg";
import toast from "react-hot-toast";
import { useController } from "react-hook-form";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

const UserSection = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const vm = UserTabPanelVM();
    const { field: register } = useController({
        control: vm.form.control,
        name: "image",
    });
    const handleFileChange = (e: any) => {
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

    const nameInitial = user
        ? user?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
        : "G";

    return (
        <div className="pt-16 max-w-4xl mx-auto">
            <div className="lg:flex flex-row justify-between items-start">
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
                    <div className={`${!vm.file&&"bg-dtech-middle-grey"} "select-none  outline-none text-lg w-28 h-28 flex justify-center items-center rounded-full text-[#F5F5F5] font-medium text-[96px] mb-4 pb-6"`}>
                        {vm.file ? <img src={vm.file} className="rounded-full"></img> : `${nameInitial}`}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <FormRow
                        label="Name"
                        labelClass=" !bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-[#3F0068] !py-1"
                    >
                        <TextField
                            className="w-[330px]"
                            formControl={{
                                control: vm.form.control,
                                name: "name",
                                rules: { required: "Name is required" },
                            }}
                            placeholder="Name"
                            textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                        />
                    </FormRow>
                    <FormRow
                        label="Email"
                        labelClass=" !bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-[#3F0068] !py-1"
                    >
                        <TextField
                            className=""
                            disabled={true}
                            formControl={{
                                control: vm.form.control,
                                name: "email",
                                rules: { required: "Email is required" },
                            }}
                            placeholder="Email"
                            textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                        />
                    </FormRow>
                    <FormRow
                        label="Organisation"
                        labelClass=" !bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-[#3F0068] !py-1"
                    >
                        <TextField
                            className=""
                            disabled={true}
                            formControl={{
                                control: vm.form.control,
                                name: "organisation",
                                rules: { required: "Organisation is required" },
                            }}
                            placeholder="Organisation"
                            textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                        />
                    </FormRow>
                    <FormRow
                        label="Role"
                        labelClass=" !bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-[#3F0068] !py-1"
                    >
                        <DropdownField
                            inputClass=" !focus:ring-dtech-main-dark border-1 !border-dtech-main-dark !focus:border-dtech-main-dark !bg-transparent"
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
                        <FormRow
                            label="Role Other"
                            className="md:col-start-2"
                            labelClass=" !bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-dtech-main-dark !py-1"
                        >
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
                                textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                            />
                        </FormRow>
                    )}
                </div>
            </div>
            {/* <div className="flex flex-row justify-end">
            </div> */}
            <div className="flex flex-row justify-end items-center">
                <span className="hover:underline underline-offset-4 mr-4 text-dtech-main-dark cursor-pointer">
                    Cancel
                </span>
                <PrimaryBtn
                    className="bg-dtech-main-dark w-min whitespace-nowrap  !px-20 !py-2 !rounded-lg"
                    label="Update"
                    isLoading={vm.isSavingUserDetails}
                    onClick={() => {
                        if(vm.form.getValues().name!==user?.name||vm.form.getValues().role!==user?.role||vm.file!=user?.user_image_url){
                        vm.form.handleSubmit(() => {

                            const formData = new FormData();
                            formData.append("name", vm.form.getValues().name);
                            formData.append("email", vm.form.getValues().email);
                            formData.append("role", vm.form.getValues().role);
                            formData.append(
                                "organisation",
                                vm.form.getValues().organisation
                            );
                            formData.append("image", vm.file || "");
                            vm.saveUserDetails({
                                ...vm.form.getValues(),
                                image: vm.file,
                            });
                        })()}
                        else{
                            toast.error("There is not any change in the form")
                    }
                    }}
                />
            </div>
        </div>
    );
};
export default UserSection;

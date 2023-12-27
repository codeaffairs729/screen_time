import DropdownField from "components/UI/form/dropdown_field";
import FormRow from "components/UI/form/form_row";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import Image from "next/image";
import UserTabPanelVM, { UserTabPanelVMContext } from "./user_tab_panel.vm";
import AdminTabPanelVM, {
    AdminTabPanelVMContext,
} from "../admin/admin_tab_panel.vm";
import cameraImage from "public/images/icons/camera_filled.svg";
import toast from "react-hot-toast";
import { useController } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BiUserCircle } from "react-icons/bi";
import GenerateApi from "./components/generateApiPopup";
import ReactTooltip from "react-tooltip";
import DeletePopup from "./components/deletePopup";
import User, { Role } from "models/user.model";
import AccountVM from "pages/account/account.vm";

const UserSection = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [viewAll, setViewAll] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const apiPopupRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const currentUserRoles = User.getAllRoles(user)
    const vm = UserTabPanelVM();
    const isAdmin = currentUserRoles?.includes(Role.ORGANIZATION_ADMIN)
    const AccountVm = AccountVM();
    useEffect(() => {
        isAdmin && AccountVm.fetchOrgUsers() 
        
    },[])
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

    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setViewAll(viewAll);
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }
    const nameInitial = user
        ? user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
        : "G";

    const handleDeletePopup = () => {
        setIsOpen(!isOpen);
    };

    const membersRoles = AccountVm?.orgusers?.map((item: any) =>
        item?.roles?.map((role: any) => role?.name)
    );
    const combinedRoles = membersRoles?.flat();

    const membersIncludeOrganisationAdmin = combinedRoles?.includes(
        Role.ORGANIZATION_ADMIN
    );
    const canDeleteUser =
        (!isAdmin || (isAdmin && AccountVm?.orgusers?.length == 0 )||
            (isAdmin && AccountVm?.orgusers?.length > 0 && membersIncludeOrganisationAdmin));

    const deltooltip =
        "Please assign at least one other admin for your organisation to be able to delete your account";

    return (
        <UserTabPanelVMContext.Provider value={vm}>
            <div className="pt-16 max-w-3xl md:mx-auto mx-2" ref={myRef}>
                <div className="flex flex-col justify-between items-center">
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
                            label="Name"
                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                            labelClass="sm:text-[19px]"
                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                            required
                        >
                            <TextField
                                className=""
                                formControl={{
                                    control: vm.form.control,
                                    name: "name",
                                    rules: { required: "Name is required" },
                                }}
                                placeholder="Enter Name"
                                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                            />
                        </FormRow>
                        <FormRow
                            label="Email"
                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                            labelClass="sm:text-[19px]"
                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                            required
                        >
                            <TextField
                                className=""
                                disabled={true}
                                formControl={{
                                    control: vm.form.control,
                                    name: "email",
                                    rules: { required: "Email is required" },
                                }}
                                placeholder="Enter Email"
                                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                            />
                        </FormRow>
                        <FormRow
                            label="Organisation"
                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                            labelClass="sm:text-[19px]"
                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                            // required
                        >
                            <TextField
                                className=""
                                disabled={true}
                                formControl={{
                                    control: vm.form.control,
                                    name: "organisation",
                                    rules: {
                                        required: "Organisation is required",
                                    },
                                }}
                                placeholder="Enter Organisation"
                                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                            />
                        </FormRow>
                        <FormRow
                            label="Role"
                            className=" md:w-auto bg-white flex-col sm:!mb-8"
                            labelClass="sm:text-[19px]"
                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                            required
                        >
                            <DropdownField
                                inputClass="rounded-[5px] sm:text-[19px] border-[#C3C3C3] focus:border-[#C3C3C3] focus:ring-opacity-0"
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
                                className=" md:w-auto bg-white flex-col sm:!mb-8"
                                labelClass="sm:text-[19px]"
                                iconClass="sm:h-[19px] sm:w-[19px] text-black"
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
                                    textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                                />
                            </FormRow>
                        )}
                    </div>
                </div>
                {/* <div className="flex flex-row justify-end">
            </div> */}
                <div className="flex flex-col justify-between items-start">
                    <PrimaryBtn
                        className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] mt-5 mb-2 text-xs sm:text-[16px]"
                        label="Update"
                        isLoading={vm.isSavingUserDetails}
                        onClick={() => {
                            if (
                                vm.form.getValues().name !== user?.name ||
                                vm.form.getValues().role !== user?.role ||
                                vm.file != user?.user_image_url
                            ) {
                                vm.form.handleSubmit(() => {
                                    const formData = new FormData();
                                    formData.append(
                                        "name",
                                        vm.form.getValues().name
                                    );
                                    formData.append(
                                        "email",
                                        vm.form.getValues().email
                                    );
                                    formData.append(
                                        "role",
                                        vm.form.getValues().role
                                    );
                                    formData.append(
                                        "organisation",
                                        vm.form.getValues().organisation
                                    );
                                    formData.append("image", vm.file || "");
                                    vm.saveUserDetails({
                                        ...vm.form.getValues(),
                                        image: vm.file,
                                    });
                                })();
                            } else {
                                toast.error(
                                    "There is no change in this form"
                                );
                            }
                        }}
                    />
                    <PrimaryBtn
                        className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] mt-5 mb-2 text-xs sm:text-[16px]"
                        label="API keys"
                        isLoading={vm.isFetchingApiKeys}
                        onClick={() => {
                            vm.fetchApiKeys();
                            // setApiPopup(!apiPopup)
                        }}
                    />
                    {canDeleteUser ? (
                        <PrimaryBtn
                            className="bg-[#D32205] active:bg-dtech-dark-yellow hover:bg-[#9F061F] active:border-b-2 border-black hover:border-0 active:text-black text-white w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] mt-5 mb-2 text-xs sm:text-[16px]"
                            label="Delete user"
                            // isLoading={vm.isFetchingApiKeys}
                            onClick={handleDeletePopup}
                        />
                    ) : (
                        <div
                            data-tip="Please assign at least one other admin for your organisation to be able to delete your account"
                            data-for={deltooltip}
                        >
                            <ReactTooltip
                                id={deltooltip}
                                className="!bg-dtech-dark-teal"
                                textColor={"white"}
                                backgroundColor="#4CA7A5"
                            />
                            <PrimaryBtn
                                className="bg-[#D32205] hover:bg-gray-500 text-white w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] mt-5 mb-2 text-xs sm:text-[16px]"
                                label="Delete user"
                            />
                        </div>
                    )}
                    {/* <span className="text-[#6E498E] border-[#6E498E] border-2 w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] mt-5 mb-2 text-xs sm:text-[16px] text-center">
                    Cancel
                </span> */}
                </div>
                {vm.apiPopup && (
                    <div ref={apiPopupRef}>
                        <GenerateApi />
                    </div>
                )}
                {isOpen && (
                    <DeletePopup handleDeletePopup={handleDeletePopup} />
                )}
            </div>
        </UserTabPanelVMContext.Provider>
    );
};
export default UserSection;

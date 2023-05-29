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
const AdminSection = () => {
    const { control, handleSubmit } = useForm();
    const admin_user = useSelector((state: RootState) => state.auth.user);
    const vm = AdminTabPanelVM();
    const user = useSelector((state: RootState) => state.auth.user);
    const nameInitial = user
        ? user?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
        : "G";
    
    return (
        <div className="pt-16">
            <AdminTabPanelVMContext.Provider value={vm}>
                <div className="lg:flex flex-row justify-between items-center max-w-3xl mx-auto">
                    <div className=" absolute ml-[105px] mt-[-100px] cursor-pointer">
                        <Image src={cameraImage} width="50px" height="50px" />
                    </div>
                    <div className="select-none outline-none text-lg w-36 h-36 flex justify-center items-center bg-[#E2E2E2]  rounded-full text-[#F5F5F5] font-medium text-[96px] mx-auto mb-4">
                        {nameInitial}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                    <FormRow
                            label="name"
                            labelClass="!bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-dtech-main-dark !py-1"
                        >
                            <TextField
                                className="bg-gray-50"
                                disabled={false}
                                formControl={{
                                    control: control,
                                    name: "name",
                                    defaultValue:
                                        "",
                                    rules: {
                                        required: "Organisation is required",
                                    },
                                }}
                                placeholder="Name"
                                textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                            />
                        </FormRow>
                        <FormRow
                            label="Organisation"
                            labelClass="!bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-dtech-main-dark !py-1"
                        >
                            <TextField
                                className="bg-gray-50"
                                disabled={true}
                                formControl={{
                                    control: control,
                                    name: "orgnaisation",
                                    defaultValue:
                                        "",
                                    rules: {
                                        required: "Organisation is required",
                                    },
                                }}
                                placeholder="Organisation"
                                textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                            />
                        </FormRow>
                        <FormRow
                            label="Email"
                            labelClass="!bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-dtech-main-dark !py-1"
                        >
                            <TextField
                                className="bg-gray-50"
                                disabled={true}
                                formControl={{
                                    control: control,
                                    name: "email",
                                    defaultValue:
                                        "",
                                    rules: {
                                        required: "",
                                    },
                                }}
                                placeholder="Email"
                                textfieldClassName="!focus:ring-dtech-main-dark border-2 !border-dtech-main-dark !focus:border-dtech-main-dark"
                            />
                        </FormRow>
                        <FormRow
                            label="Role"
                            labelClass="!bg-[#F8F8F8] !w-auto z-10 mx-5 absolute mb-10 text-dtech-main-dark !py-1"
                        >
                            <TextField
                                className="bg-gray-100"
                                disabled={false}
                                formControl={{
                                    control: control,
                                    name: "role",
                                    defaultValue:User.getOrganisation(admin_user)?.name,
                                    rules: {
                                        required: "",
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
                            onClick={handleSubmit(vm.saveOrgDetails)}
                        />
                    </div>
                </div>
            </AdminTabPanelVMContext.Provider>
        </div>
    );
};

export default AdminSection;

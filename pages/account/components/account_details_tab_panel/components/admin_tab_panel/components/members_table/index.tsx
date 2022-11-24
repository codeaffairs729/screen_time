import DropdownField from "components/UI/form/dropdown_field";
import { ReactNode, useContext } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import clsx from "clsx";
import Loader from "components/UI/loader";
import TextBtn from "components/UI/buttons/text_btn";
import { AdminTabPanelVMContext } from "../../admin_tab_panel.vm";
import User, { Role } from "models/user.model";

const MembersTable = () => {
    const { control } = useForm();
    // const vm = MembersTableVM();
    const adminPanelVm = useContext(AdminTabPanelVMContext);

    return (
        <>
            {/* <div className="flex mt-6 mb-4">
                <input
                    type="text"
                    className="w-full p-0 text-sm px-2 py-1"
                    placeholder="Filter members"
                />
                <button className="px-2 border border-gray-700 border-l-0 bg-gray-50">
                    <BsSearch />
                </button>
            </div> */}
            <div className="shadow-sm mb-8 mt-6">
                {!adminPanelVm.isFetchingOrgUsers &&
                    adminPanelVm.orgusers?.length > 0 && (
                        <table className="border-collapse table-auto w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                        Name
                                    </th>
                                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                        Email
                                    </th>
                                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8  pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                        Permission
                                    </th>
                                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8  pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800">
                                {adminPanelVm.orgusers.map((user: User) => {
                                    return (
                                        <tr key={user.email}>
                                            <TD>{user.name}</TD>
                                            <TD>{user.email}</TD>
                                            <TD>{User.getRole(user)?.name}</TD>
                                            <TD className="flex flex-col items-center">
                                                <TextBtn
                                                    label={`${
                                                        User.getRole(user)
                                                            ?.name ==
                                                        Role.ORGANIZATION_ADMIN
                                                            ? "Make member"
                                                            : "Make admin"
                                                    }`}
                                                    className="text-sm underline text-blue-700"
                                                    onClick={() => {
                                                        if (
                                                            User.getRole(user)
                                                                ?.name ==
                                                            Role.ORGANIZATION_ADMIN
                                                        ) {
                                                            adminPanelVm.makeOrgMember(
                                                                user
                                                            );
                                                        } else {
                                                            adminPanelVm.makeOrgAdmin(
                                                                user
                                                            );
                                                        }
                                                    }}
                                                    isLoading={
                                                        adminPanelVm.isChangingRole &&
                                                        adminPanelVm.changingRoleUserId ==
                                                            user.id
                                                    }
                                                />
                                                <TextBtn
                                                    label="Remove user"
                                                    className="text-sm underline text-red-700"
                                                    isLoading={
                                                        adminPanelVm.isDeletingOrgMember
                                                    }
                                                    onClick={() =>
                                                        adminPanelVm.deleteOrgMember(
                                                            user.id
                                                        )
                                                    }
                                                />
                                                {/* <button className="text-sm underline text-blue-700">
                                                Make admin
                                            </button> */}
                                                {/* <button className="text-sm underline text-red-700">
                                                Remove user
                                            </button> */}
                                            </TD>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                {adminPanelVm.isFetchingOrgUsers && (
                    <div className="flex items-center justify-center">
                        <Loader />
                    </div>
                )}
                {!adminPanelVm.isFetchingOrgUsers &&
                    adminPanelVm.orgusers.length == 0 && (
                        <div className="text-sm font-light text-gray-800">
                            No users were found
                        </div>
                    )}
            </div>
        </>
    );
};

const TD = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <td
            className={clsx(
                "border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400",
                className
            )}
        >
            {children}
        </td>
    );
};

export default MembersTable;

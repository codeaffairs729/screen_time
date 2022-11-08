import DropdownField from "components/UI/form/dropdown_field";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import MembersTableVM from "./members_table.vm";
import { BsSearch } from "react-icons/bs";
import clsx from "clsx";

const MembersTable = () => {
    const { control } = useForm();
    const vm = MembersTableVM();
    return (
        <>
            <div className="flex mt-6 mb-4">
                <input
                    type="text"
                    className="w-full p-0 text-sm px-2 py-1"
                    placeholder="Filter members"
                />
                <button className="px-2 border border-gray-700 border-l-0 bg-gray-50">
                    <BsSearch />
                </button>
            </div>
            <div className="shadow-sm mb-8">
                <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                        <tr>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                Name
                            </th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                Email
                            </th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                Permission
                            </th>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800">
                        {vm.membersData.map((member) => {
                            return (
                                <tr key={member.email}>
                                    <TD>{member.name}</TD>
                                    <TD>{member.email}</TD>
                                    <TD>
                                        <DropdownField
                                            className=""
                                            placeholder="Role"
                                            options={[
                                                {
                                                    value: "admin",
                                                    label: "Admin",
                                                },
                                                {
                                                    value: "member",
                                                    label: "Member",
                                                },
                                            ]}
                                            formControl={{
                                                defaultValue: "admin",
                                                control: control,
                                                name: "sector",
                                                rules: {},
                                            }}
                                        />
                                    </TD>
                                    <TD className="flex flex-col items-center">
                                        <button className="text-sm underline text-blue-700">
                                            Make admin
                                        </button>
                                        <button className="text-sm underline text-red-700">
                                            Remove user
                                        </button>
                                    </TD>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const TD = ({ children, className="" }: { children: ReactNode, className?: string }) => {
    return (
        <td className={clsx("border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400", className)}>
            {children}
        </td>
    );
};

export default MembersTable;

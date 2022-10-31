import DropdownField from "components/UI/form/dropdown_field";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import MembersTableVM from "./members_table.vm";

const MembersTable = () => {
    const { control } = useForm();
    const vm = MembersTableVM();
    return (
        <div className="shadow-sm my-8">
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
                                <TD>
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
    );
};

const TD = ({ children }: { children: ReactNode }) => {
    return (
        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            {children}
        </td>
    );
};

export default MembersTable;

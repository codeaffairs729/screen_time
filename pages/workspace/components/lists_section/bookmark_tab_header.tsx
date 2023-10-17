import { Tab } from "@headlessui/react";
import DeleteListVM from "components/UI/user_bookmark/delete_list.vm";
import EditListNameVM from "components/UI/user_bookmark/edit_list_name.vm";
import { ReactNode, useEffect, useState } from "react";
import { BsCheck, BsPencil, BsTrash, BsTrashFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "store";

const TabHeader = ({
    children,
    onClick,
    selectedIndex,
    index,
    list,
}:
{
    children: ReactNode;
    onClick: Function;
    selectedIndex: number;
    index: number;
    list: any;
}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { deleteUserList, isDeletingList } = DeleteListVM(user);
    const { editListName, isEditingListName } = EditListNameVM(user);
    const [editActive, setEditActive] = useState<boolean>(false);
    const [newListName, setNewListName] = useState<string>(list.label);
    useEffect(() => {
        selectedIndex !== index && setEditActive(false);
    }, [selectedIndex]);

    useEffect(()=>{
        setNewListName(list.label)
    },[list])

    return (
        <div
            className="transition-all h-fit text-lg outline-none   text-left  hover:bg-gray-300
        text-[#727272] my-0.5 relative"
        >
            {editActive && selectedIndex == index && (
                <div className="absolute z-10 mt-[6px] ml-7">
                    <input
                        type="text"
                        className="py-0 px-0.5 w-2/3 z-10"
                        value={newListName}
                        onChange={(event) => setNewListName(event.target.value)}
                    />

                    <button
                        className="px-2 py-0.5 ml-6"
                        onClick={() => {
                            editListName(newListName, list.id);
                            setEditActive(false);
                        }}
                    >
                        <BsCheck className="text-gray-600 hover:text-red-600 z-10" />
                    </button>
                </div>
            )}
            <Tab
                className={({ selected }) =>
                    `transition-all h-fit text-lg outline-none   text-left  hover:bg-gray-300 w-full
            text-[#727272] my-0.5  ${
                selected && " bg-gray-300 !text-gray-500 hover:text-black  "
            }
            `
                }
                onClick={() => onClick()}
            >
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center mx-2 my-2">
                        {selectedIndex == index && (
                            <div
                                className={`cursor-pointer border-l-[3px]  border-[#6E498E] h-5 mx-2 `}
                            ></div>
                        )}
                        {!editActive && (
                            <div
                                className={`${
                                    selectedIndex !== index && "ml-[17px]"
                                }`}
                            >
                                {children}
                            </div>
                        )}
                    </div>
                    {selectedIndex == index && list.label !== "Favourites" && (
                        <div className="flex">
                            {!editActive && (
                                <>
                                    <button
                                        className="px-2 py-0.5"
                                        onClick={() => {
                                            setEditActive(true);
                                        }}
                                    >
                                        <MdModeEdit className="text-gray-600 hover:text-red-600 w-6 h-6" />
                                    </button>

                                    <button
                                        className="px-2 py-0.5"
                                        onClick={() => {
                                            deleteUserList(list.label, list.id);
                                        }}
                                    >
                                        <BsTrashFill className="text-gray-600 hover:text-red-600 w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </Tab>
        </div>
    );
};
export default TabHeader;
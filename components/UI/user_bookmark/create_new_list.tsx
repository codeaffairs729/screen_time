import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import CreateListVM from "./create_list.vm";
import Loader from "../loader";

const CreateNewList = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const bookmark_lists = useSelector(
        (state: RootState) => state.user.bookmarkLists
    );
    const { createNewUserList, isCreatingList } = CreateListVM(
        user,
        bookmark_lists
    );

    const [newNameActive, setNewNameActive] = useState(false);
    const [listName, setListName] = useState("");

    if (!newNameActive) {
        return (
            <>
                {isCreatingList ? (
                    <button
                        className="bg-dtech-secondary-light rounded text-white text-sm mr-2 mb-1 px-3 py-1.5 outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setNewNameActive(true)}
                    >
                        <Loader />
                    </button>
                ) : (
                    <button
                        className="bg-dtech-secondary-light rounded text-white font-semibold text-sm mr-2 mb-1 px-3 py-1.5 outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setNewNameActive(true)}
                    >
                        Create new list
                    </button>
                )}
            </>
        );
    }

    return (
        <div className="flex flex-row mb-1">
            <button
                className="bg-gray-100 text-gray-400 font-bold text-xs px-3 py-1.5 outline-none focus:outline-none ease-linear transition-all duration-150 border-[1px] rounded-l border-gray-200"
                onClick={() => setNewNameActive(false)}
            >
                x
            </button>
            <input
                type="text"
                id="list-name"
                name="listName"
                className="text-xs px-3 py-1.5 outline-none focus:outline-none  border-0 font-semibold"
                placeholder="New list name..."
                value={listName}
                onChange={(event) => setListName(event.target.value)}
            />
            <button
                className="bg-dtech-secondary-light text-white font-bold text-xs px-3 py-1.5 ease-linear transition-all duration-150 border-[1px] rounded-r border-dtech-primary-dark"
                onClick={() => {
                    createNewUserList(listName);
                    setListName("");
                    setNewNameActive(false);
                }}
            >
                +
            </button>
        </div>
    );
};

export default CreateNewList;

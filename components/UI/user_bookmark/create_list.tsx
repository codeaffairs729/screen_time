import { useEffect, useRef, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "store";
import CreateListVM from "./create_list.vm";
import Loader from "../loader";

const CreateList = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const bookmark_lists = useSelector(
        (state: RootState) => state.user.bookmarkLists
    );
    const [newNameActive, setNewNameActive] = useState(false);
    const [listName, setListName] = useState("");

    const ref = useRef<any>();

    const { createNewUserList, isCreatingList } = CreateListVM(
        user,
        bookmark_lists
    );

    useEffect(() => {
        if (newNameActive) {
            ref.current?.focus();
        }
    }, [newNameActive]);

    const createList = () => {
        createNewUserList(listName.trim());
        setListName("");
        setNewNameActive(false);
    };

    return (
        <div className="ml-8 mr-auto">
            <div className="flex items-center justify-between outline-offset-[-2px] outline-dashed outline-2 overflow-hidden outline-dtech-main-dark rounded-lg px-3 h-8 w-44 cursor-pointer">
                {isCreatingList ? (
                    <Loader />
                ) : (
                    <BsPlusLg
                        className="text-dtech-main-dark h-[18px] w-[18px]"
                        onClick={() =>
                            newNameActive
                                ? createList()
                                : setNewNameActive(true)
                        }
                    />
                )}
                {newNameActive ? (
                    <input
                        ref={ref}
                        className="text-lg w-32 outline-none"
                        value={listName}
                        onChange={(event) => setListName(event.target.value)}
                    />
                ) : (
                    <span
                        className="text-lg"
                        onClick={() => setNewNameActive(true)}
                    >
                        Create new list
                    </span>
                )}
            </div>
        </div>
    );
};

export default CreateList;

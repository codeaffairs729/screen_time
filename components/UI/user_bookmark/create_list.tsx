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
    const [newNameActive, setNewNameActive] = useState<boolean>(false);
    const [listName, setListName] = useState<string>("");

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
        <div className="mr-auto">
            <div className="flex items-center justify-between border-2 md:border-[#727272]  overflow-hidden border-dtech-main-dark rounded-full px-3 h-12 w-1/2 md:w-full cursor-pointer py-2 mx-3 md:mx-0">
                {newNameActive ? (
                    <input
                        ref={ref}
                        className="text-lg w-32 outline-none"
                        value={listName}
                        onChange={(event) => setListName(event.target.value)}
                    />
                ) : (
                    <span
                        className="text-lg  text-dtech-main-dark md:text-black"
                        onClick={() => setNewNameActive(true)}
                    >
                        Create new list
                    </span>
                )}
                {/* <div className=""> */}
                    {isCreatingList ? (
                        <Loader />
                    ) : (
                        <BsPlusLg
                            className="text-[#727272]  h-[18px] w-[18px] hover:opacity-80"
                            onClick={() =>
                                newNameActive
                                    ? createList()
                                    : setNewNameActive(true)
                            }
                        />
                    )}
                {/* </div> */}
            </div>
        </div>
    );
};

export default CreateList;

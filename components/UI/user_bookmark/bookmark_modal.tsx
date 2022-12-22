import Dataset from "models/dataset.model";
import CreateNewList from "./create_new_list";
import { useSelector } from "react-redux";
import { RootState } from "store";
import {
    BsTrash,
    BsBookmarkCheckFill,
    BsBookmark,
    BsPencil,
    BsCheck,
} from "react-icons/bs";
import DeleteListVM from "./delete_list.vm";
import Loader from "../loader";
import AddListItemVM from "./add_list_item.vm";
import DelListItemVM from "./del_list_item.vm";
import EditListNameVM from "./edit_list_name.vm";
import { useState } from "react";

export default function BookmarkModal({
    showModal,
    setShowModal,
    dataset,
}: {
    showModal: any;
    setShowModal: any;
    dataset: any;
}) {
    const bookmark_items = useSelector(
        (state: RootState) => state.user.bookmarkItems
    );
    const bookmark_lists = useSelector(
        (state: RootState) => state.user.bookmarkLists
    );

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-[26rem] my-6 mx-auto px-5">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between px-5 py-3 border-b border-solid border-slate-200 rounded-t">
                                    <p className="text-lg font-semibold">
                                        Bookmarks
                                    </p>
                                </div>
                                {/*body*/}
                                <div className="flex flex-col h-36 m-3 px-5 justify-start text-left overflow-y-auto">
                                    <ul>
                                        {bookmark_lists.length == 0 ? (
                                            <>
                                                <p>
                                                    You currently do not have
                                                    any lists.
                                                </p>
                                                <p>Please create one.</p>
                                            </>
                                        ) : (
                                            bookmark_lists.map((list: any) => (
                                                <ModelList
                                                    key={list.listID}
                                                    bookmark_items={
                                                        bookmark_items
                                                    }
                                                    list={list}
                                                    dataset={dataset}
                                                />
                                            ))
                                        )}
                                    </ul>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-between px-5 py-3 border-t border-solid border-slate-200 rounded-b">
                                    <CreateNewList inLists={false} />
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase text-xs mx-2 mb-1 px-3 py-1.5 outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        CLOSE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

const ModelList = ({
    list,
    bookmark_items,
    dataset,
}: {
    list: any;
    bookmark_items: any;
    dataset: any;
}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { deleteUserList, isDeletingList } = DeleteListVM(user);
    const { addNewListItem, isAddingListItem } = AddListItemVM(user);
    const { delOldListItem, isDeletingListItem } = DelListItemVM(user);
    const { editListName, isEditingListName } = EditListNameVM(user);
    const [editActive, setEditActive] = useState(false);
    const [newListName, setNewListName] = useState(list.listName);

    let thisList = false;
    let thisItemID = 0;

    bookmark_items.forEach((list_item: any) => {
        if (
            list_item.listID == list.listID &&
            dataset.id == list_item.datasetID
        ) {
            thisList = true;
            thisItemID = list_item.itemID;
        }
    });
    return (
        <li className="items-center my-1 py-0.5 w-full bg-gray-100 hover:bg-gray-200 border-radius-md flex justify-between">
            <div className="flex items-center">
                {thisList ? (
                    isAddingListItem ? (
                        <button className="px-2">
                            <Loader />
                        </button>
                    ) : (
                        <button
                            className="px-2 py-0.5"
                            onClick={() => {
                                delOldListItem(
                                    list.listID,
                                    dataset.id,
                                    thisItemID
                                );
                            }}
                        >
                            <BsBookmarkCheckFill className="text-dtech-secondary-dark hover:text-dtech-secondary-light" />
                        </button>
                    )
                ) : isDeletingListItem ? (
                    <button className="px-2">
                        <Loader />
                    </button>
                ) : (
                    <button
                        className="px-2 py-0.5"
                        onClick={() => {
                            addNewListItem(list.listID, dataset.id);
                        }}
                    >
                        <BsBookmark className="text-dtech-secondary-dark hover:text-dtech-secondary-light" />
                    </button>
                )}

                <>
                    {editActive ? (
                        <input
                            type="text"
                            className="py-0 px-0.5 outline-none"
                            value={newListName}
                            onChange={(event) =>
                                setNewListName(event.target.value)
                            }
                        />
                    ) : (
                        <span>{list.listName}</span>
                    )}
                </>
            </div>

            <div className="flex items-center">
                <div>
                    {isEditingListName ? (
                        <button className="px-2">
                            <Loader />
                        </button>
                    ) : (
                        <>
                            {editActive ? (
                                <button
                                    className="px-2 py-0.5"
                                    onClick={() => {
                                        editListName(newListName, list.listID);
                                        setEditActive(false);
                                    }}
                                >
                                    <BsCheck className="text-gray-600 hover:text-red-600" />
                                </button>
                            ) : (
                                <button
                                    className="px-2 py-0.5"
                                    onClick={() => {
                                        setEditActive(true);
                                    }}
                                >
                                    <BsPencil className="text-gray-600 hover:text-red-600" />
                                </button>
                            )}
                        </>
                    )}
                </div>
                <div>
                    {!editActive && (
                        <>
                            {isDeletingList ? (
                                <button className="px-2">
                                    <Loader />
                                </button>
                            ) : (
                                <button
                                    className="px-2 py-0.5"
                                    onClick={() => {
                                        deleteUserList(
                                            list.listName,
                                            list.listID
                                        );
                                    }}
                                >
                                    <BsTrash className="text-gray-600 hover:text-red-600" />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </li>
    );
};

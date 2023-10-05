import CreateNewList from "./create_new_list";
import { useSelector } from "react-redux";
import { RootState } from "store";
import {
    BsTrash,
    BsBookmarkCheckFill,
    BsBookmark,
    BsPencil,
    BsCheck,
    BsBookmarkFill,
} from "react-icons/bs";
import DeleteListVM from "./delete_list.vm";
import Loader from "../loader";
import AddListItemVM from "./add_list_item.vm";
import DelListItemVM from "./del_list_item.vm";
import EditListNameVM from "./edit_list_name.vm";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { AiOutlineClose } from "react-icons/ai";

export default function BookmarkModal({
    showModal,
    setShowModal,
    data,
    recordType,
}: {
    showModal: any;
    setShowModal: any;
    data: any;
    recordType: string;
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
                            <div className="border-[2px]  border-[#6DCDCB] rounded-lg shadow-lg relative flex flex-col w-full bg-white pt-3">
                                {/*header*/}
                                <div>
                                    <AiOutlineClose
                                        className="absolute cursor-pointer right-7 top-4"
                                        onClick={() => setShowModal(false)}
                                    />
                                </div>
                                <div className="flex items-center justify-between px-4 pt-5 pb-1 rounded-t">
                                    <p className="text-lg font-normal">
                                        {bookmark_lists?.length == 0
                                            ? "Lists"
                                            : "Save to:"}
                                    </p>
                                </div>
                                <div className="border-b border-solid border-slate-400 mx-4"></div>
                                {/*body*/}
                                <div className="flex flex-col h-36 justify-start text-left overflow-y-auto mx-4">
                                    <ul>
                                        {bookmark_lists?.length == 0 ? (
                                            <>
                                                <p>
                                                    You currently do not have
                                                    any lists.
                                                </p>
                                                <p>Please create one.</p>
                                            </>
                                        ) : (
                                            bookmark_lists?.map((list: any) => (
                                                <ModelList
                                                    key={list.listID}
                                                    bookmark_items={
                                                        bookmark_items
                                                    }
                                                    list={list}
                                                    data={data}
                                                    recordType={recordType}
                                                />
                                            ))
                                        )}
                                    </ul>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-between px-5 py-3 rounded-b ">
                                    <CreateNewList
                                        inLists={false}
                                        labelClass={
                                            " rounded-full !py-3 !my-3 !px-4 !bg-dtech-new-main-light"
                                        }
                                    />
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
    data,
    recordType,
}: {
    list: any;
    bookmark_items: any;
    data: any;
    recordType: string;
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
            (data.id == list_item.datasetID ||
                data.id == list_item.organisationID)
        ) {
            thisList = true;
            thisItemID = list_item.itemID;
        }
    });

    const getItemPayload = () => {
        switch (recordType) {
            case "dataset":
                return { datasetID: data.id };

            case "organisation":
                return { organisationUUID: data.id };
            default:
                return { datasetID: data.id };
        }
    };

    return (
        <li className="items-center my-3 py-1.5 w-full bg-gray-100 hover:bg-gray-200 border-radius-md flex justify-between">
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
                                    thisItemID,
                                    getItemPayload()
                                );
                            }}
                        >
                            <BsBookmarkFill
                                className=" text-dtech-light-teal"
                                size={20}
                            />
                        </button>
                    )
                ) : isDeletingListItem ? (
                    <button className="px-2">
                        <Loader />
                    </button>
                ) : (
                    <div data-tip="Select list">
                        <button
                            className="px-2 py-0.5"
                            onClick={() => {
                                addNewListItem(list.listID, getItemPayload());
                            }}
                        >
                            <BsBookmark
                                className="text-dtech-light-teal"
                                size={20}
                            />
                        </button>
                        <ReactTooltip
                            uuid="dtechtive-list-selected-btn-tooltip"
                            textColor={"white"}
                            backgroundColor="#4CA7A5"
                            overridePosition={({ left, top }, _e, _t, node) => {
                                return {
                                    top,
                                    left:
                                        typeof node === "string" ? left : Math.max(left, 0),
                                };
                            }}
                        />
                    </div>
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
                                <div data-tip="Edit">
                                    <button
                                        className="px-2 py-0.5"
                                        onClick={() => {
                                            setEditActive(true);
                                        }}
                                    >
                                        <BsPencil className="text-gray-600 hover:text-red-600" />
                                    </button>
                                    <ReactTooltip
                                        uuid="dtechtive-edit-btn-tooltip"
                                        textColor={"white"}
                                        backgroundColor="#4CA7A5"

                                        overridePosition={({ left, top }, _e, _t, node) => {
                                            return {
                                                top,
                                                left:
                                                    typeof node === "string" ? left : Math.max(left, 0),
                                            };
                                        }}
                                    />
                                </div>
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
                                <div data-tip="Delete">
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
                                    <ReactTooltip
                                        uuid="dtechtive-delete-btn-tooltip"
                                        textColor={"white"}
                                        backgroundColor="#4CA7A5"
                                        overridePosition={({ left, top }, _e, _t, node) => {
                                            return {
                                                top,
                                                left:
                                                    typeof node === "string" ? left : Math.max(left, 0),
                                            };
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </li>
    );
};

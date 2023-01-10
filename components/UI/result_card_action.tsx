import { useState } from "react";
import { BsShareFill } from "react-icons/bs";
import FavouriteBtn from "./buttons/favourite_btn.v4";
import Popup from "./popup";
import BookmarkBtn from "./user_bookmark/bookmark_btn";
import { Menu, Transition } from "@headlessui/react";
import { Data } from "./result_card";

type ResultCardActionProps = {
    data: Data | undefined;
    setData: Function;
    href: string;
};
const ResultCardAction = ({ data, setData, href }: ResultCardActionProps) => {
    const [share, setShare] = useState(false);

    if (!data) {
        return null;
    }

    const onFav = () => setData({ ...data, isFavourited: !data.isFavourited });
    return (
        <div>
            <div className="flex">
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button>
                                <BsShareFill
                                    className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer "
                                    data-modal-toggle="popup"
                                    onClick={() => setShare(!share)}
                                />
                            </Menu.Button>
                            <Transition show={open}>
                                <Menu.Items static className="mt-6">
                                    <Popup href={href} dataset={data.title} />
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
                <FavouriteBtn
                    className="mx-auto"
                    datasetStats={data}
                    recordType={data.recordType}
                    onFavouriteChange={onFav}
                />
                <BookmarkBtn
                    className="mx-auto"
                    data={data}
                    recordType={data.recordType}
                />
            </div>
        </div>
    );
};
export default ResultCardAction;

import FavouritesSection from "./favourites_section";
import BookmarksSection from "./bookmarks_section";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import clsx from "clsx";
import { ReactNode } from "react";
import CreateNewList from "components/UI/user_bookmark/create_new_list";
import { useSelector } from "react-redux";
import { RootState } from "store";

const ListsSection = () => {
    const bookmark_items = useSelector(
        (state: RootState) => state.user.bookmarkItems
    );
    const bookmark_lists = useSelector(
        (state: RootState) => state.user.bookmarkLists
    );

    return (
        <div>
            <Tab.Group>
                <div className="flex">
                    <Tab.List className="flex flex-col min-w-[15rem] w-1/6 mt-5">
                        <TabHeader>Favorites</TabHeader>

                        {bookmark_lists.map((list: any, idx: any) => (
                            <TabHeader key={idx}>{list.listName}</TabHeader>
                        ))}
                        <div className="px-1 py-1 mt-5">
                            <CreateNewList inLists={true} />
                        </div>
                    </Tab.List>
                    <Tab.Panels className="w-full flex">
                        <TabPanel>
                            <FavouritesSection />
                        </TabPanel>
                        {bookmark_lists.map((list: any, idx: any) => (
                            <TabPanel key={idx}>
                                <BookmarksSection
                                    datasetIDS={list.listDatasets}
                                />
                            </TabPanel>
                        ))}
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </div>
    );
};

export default ListsSection;

const TabHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "flex text-sm font-semibold px-1 py-1 mb-2 outline-none w-full rounded-full border-dtech-primary-dark border-[1px]",
                    selected
                        ? "bg-dtech-primary-dark text-white "
                        : "text-dtech-primary-dark"
                )
            }
        >
            <div className="mx-auto">{children}</div>
        </Tab>
    );
};

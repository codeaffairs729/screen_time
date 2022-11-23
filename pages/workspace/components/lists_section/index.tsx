import FavouritesSection from "./favourites_section";
import BookmarksSection from "./bookmarks_section";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import clsx from "clsx";
import { ReactNode } from "react";
import CreateNewList from "components/UI/user_bookmark/create_new_list";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BsPlusLg } from "react-icons/bs";
import CreateList from "components/UI/user_bookmark/create_list";

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
                <div>
                    <Tab.List className="flex min-w-[15rem] items-center px-6 w-[70vw]">
                        <div className="flex items-center w-2/3 overflow-auto">
                            <TabHeader>Favorites</TabHeader>

                            {bookmark_lists.map((list: any, idx: any) => (
                                <TabHeader key={idx}>{list.listName}</TabHeader>
                            ))}
                        </div>
                        <CreateList />
                    </Tab.List>
                    <Tab.Panels className="w-full flex">
                        <TabPanel className="bg-white">
                            <FavouritesSection />
                        </TabPanel>
                        {bookmark_lists.map((list: any, idx: any) => (
                            <TabPanel key={idx} className="bg-white">
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
                `transition-all h-fit text-lg mr-10 outline-none text-dtech-main-dark border-dtech-main-dark w-24 whitespace-nowrap text-center ${
                    selected && "border-b-2"
                }`
            }
        >
            <span>{children}</span>
        </Tab>
    );
};

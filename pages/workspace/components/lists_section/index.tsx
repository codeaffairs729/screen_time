import FavouritesSection from "./favourites_section";
import BookmarksSection from "./bookmarks_section";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import clsx from "clsx";
import { createRef, ReactNode } from "react";
import CreateNewList from "components/UI/user_bookmark/create_new_list";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BsPlusLg } from "react-icons/bs";
import CreateList from "components/UI/user_bookmark/create_list";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const SCROLLABLE_VALUE: number = 150;

const ListsSection = () => {
    const bookmark_items = useSelector(
        (state: RootState) => state.user.bookmarkItems
    );
    const bookmark_lists = useSelector(
        (state: RootState) => state.user.bookmarkLists
    );

    const scrollableDiv = createRef<HTMLDivElement>();
    const scroll = (value: number) => {
        if (scrollableDiv?.current) scrollableDiv.current.scrollLeft += value;
    };
    return (
        <div>
            <Tab.Group>
                <div>
                    <Tab.List className="flex min-w-[15rem] items-center px-6 w-[70vw]">
                        <div
                            className="cursor-pointer py-1 px-4"
                            onClick={() => scroll(-SCROLLABLE_VALUE)}
                        >
                            <BsChevronLeft />
                        </div>
                        <div
                            ref={scrollableDiv}
                            id="scrollable-div"
                            className="scroll-smooth no-scrollbar flex flex-start gap-10 items-center w-2/3 overflow-x-auto overflow-y-hidden whitespace-nowrap"
                        >
                            <TabHeader>Favourites</TabHeader>

                            {bookmark_lists?.map((list: any, idx: any) => (
                                <TabHeader key={idx}>{list.listName}</TabHeader>
                            ))}
                        </div>
                        <div
                            className="cursor-pointer py-1 px-4"
                            onClick={() => scroll(SCROLLABLE_VALUE)}
                        >
                            <BsChevronRight />
                        </div>
                        <CreateList />
                    </Tab.List>
                    <Tab.Panels className="w-full flex">
                        <TabPanel className="bg-white">
                            <div className="text-sm text-dtech-dark-grey my-4 mx-4">
                                 Your list of favourite datasets and data providers.
                            </div>
                            <FavouritesSection />
                        </TabPanel>
                        {bookmark_lists?.map((list: any, idx: any) => (
                            <TabPanel key={idx} className="bg-white">
                                <BookmarksSection list={list} />
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
                `transition-all h-fit text-lg outline-none text-dtech-main-dark border-dtech-main-dark text-center ${
                    selected && "border-b-2"
                }`
            }
        >
            <span>{children}</span>
        </Tab>
    );
};

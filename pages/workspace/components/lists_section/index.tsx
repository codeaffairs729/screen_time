import FavouritesSection from "./favourites_section";
import BookmarksSection from "./bookmarks_section";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
// import clsx from "clsx";
import { createRef, ReactNode, useEffect, useMemo, useState } from "react";
// import CreateNewList from "components/UI/user_bookmark/create_new_list";
import { useSelector } from "react-redux";
import { RootState } from "store";
import CreateList from "components/UI/user_bookmark/create_list";
import Accordian from "components/UI/new_accordian";
import TabHeader from "./bookmark_tab_header";
import { useIsMobile } from "common/hooks";

const ListsSection = () => {
    const bookmark_items = useSelector(
        (state: RootState) => state.user.bookmarkItems
    );
    const bookmark_lists = useSelector(
        (state: RootState) => state.user.bookmarkLists
    );
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const { isMobile } = useIsMobile();

    // const router = useRouter();

    // useEffect(() => {
    //     let newPath;
    //     if (selectedIndex === 0) {
    //         newPath = "/workspace?section=lists&subsection=favourites&page=1";
    //     }else {
    //         newPath = `/workspace?section=lists&subsection=${ListHeader[selectedIndex]["label"]}&page=1`;
    //     }
    //     router.replace(newPath);
    // }, [selectedIndex]);

    const ListHeader = useMemo(
        () => [
            { label: "Favourites" },
            ...bookmark_lists?.map((list: any) => ({
                label: list.listName,
                id: list.listID,
            })),
        ],
        [bookmark_lists]
    );

    return (
        <div>
            {!isMobile ? (
                <div>
                    <Tab.Group defaultIndex={selectedIndex}>
                        <div className=" md:flex ">
                            <Tab.List className=" items-center px-6 my-7 w-[30%]">
                                <FilterDropdown label="Lists">
                                    {ListHeader?.map((list: any, idx: any) => (
                                        <TabHeader
                                            key={idx}
                                            selectedIndex={selectedIndex}
                                            index={idx}
                                            list={list}
                                            onClick={() =>
                                                setSelectedIndex(idx)
                                            }
                                        >
                                            {list.label}
                                        </TabHeader>
                                    ))}
                                </FilterDropdown>
                                <div className="my-10">
                                    <CreateList />
                                </div>
                            </Tab.List>
                            <Tab.Panels className="w-full flex">
                                <TabPanel className="!bg-white">
                                    <FavouritesSection />
                                </TabPanel>
                                {bookmark_lists?.map((list: any, idx: any) => (
                                    <TabPanel
                                        key={idx}
                                        className="!bg-white !p-0"
                                    >
                                        <BookmarksSection list={list} />
                                    </TabPanel>
                                ))}
                            </Tab.Panels>
                        </div>
                    </Tab.Group>
                </div>
            ) : (
                <div className="">
                    <div className="my-10">
                        <CreateList />
                    </div>
                    <Accordian
                        className=" "
                        label={"Favourites"}
                        key="Favourites"
                        section={"workspace"}
                    >
                        <FavouritesSection />
                    </Accordian>

                    {bookmark_lists?.map((list: any, idx: any) => (
                        <Accordian
                            label={list.listName}
                            key={list.listName + idx}
                            section={"workspace"}
                        >
                            <BookmarksSection list={list} />
                        </Accordian>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListsSection;

const FilterDropdown = ({
    children,
    label,
}: {
    children: ReactNode;
    label: string;
}) => {
    // const [clicked, SetClicked] = useState<boolean>(false);

    return (
        <div className="my-1">
            <div
                className=" flex  justify-between items-center py-1.5 bg-[#6DCDCB]  px-3 cursor-pointer"
                // onClick={() => SetClicked(!clicked)}
            >
                <span>{label}</span>
                {/* <BsChevronDown
                    className={`
                            transition-all h-4 w-6 ${clicked && "rotate-180"}`}
                    strokeWidth="2"
                /> */}
            </div>
            <div className="flex flex-col flex-start my-1">{children}</div>
        </div>
    );
};

import FavouritesSection from "./favourites_section";
import { Tab } from "@headlessui/react";
import TabHeader from "components/UI/tabbed/header";
import TabPanel from "components/UI/tabbed/panel";
import { BsPlusSquareFill } from "react-icons/bs";

const ListsSection = () => {
    return (
        <div>
            <Tab.Group>
                <div className="flex">
                    <Tab.List className="flex flex-col w-1/6">
                        <TabHeader>Favorites</TabHeader>
                        <TabHeader>
                            <span className="flex text-dtech-secondary-dark">
                                <BsPlusSquareFill className="text-lg mr-2" />
                                create a list...
                            </span>
                        </TabHeader>
                    </Tab.List>
                    <Tab.Panels className="w-full flex">
                        <TabPanel>
                            <div>
                                <FavouritesSection />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>Work in progress...</div>
                        </TabPanel>
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </div>
    );
};

export default ListsSection;

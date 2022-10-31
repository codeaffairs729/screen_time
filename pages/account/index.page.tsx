// import withAuth from "common/HOCs/with_auth";
// import DefaultLayout from "components/layouts/default";
// import ErrorAlert from "components/UI/alerts/error_alert";
// import PrimaryBtn from "components/UI/form/primary_btn";
// import { DateTime } from "luxon";
// import Image from "next/image";
// import { useSelector } from "react-redux";
// import { RootState } from "store";
// import HeaderValue from "./components/header_value";
// import { Role } from "models/user.model";
// import { startCase } from "lodash-es";

// const AccountPage = () => {
//     const user = useSelector((state: RootState) => state.auth.user);
//     if (!user) {
//         return (
//             <ErrorAlert className="m-2" message="Please login to continue" />
//         );
//     }

//     return (
//         <DefaultLayout>
//             <div className="mx-4 md:mx-20">
//                 <div className="md:flex">
//                     <div className="w-52 p-3 relative mx-auto">
//                         <Image
//                             src="/images/icons/profile/guest_Icon.svg"
//                             width="40"
//                             height="40"
//                             layout="responsive"
//                             alt="profile img"
//                         />
//                     </div>
//                     <div className="w-full flex flex-col justify-center md:w-3/4 ml-auto">
//                         <div className="flex items-center mb-3">
//                             <h3 className="font-medium mr-10 text-lg text-gray-700">
//                                 {user.name ?? user.email}
//                             </h3>
//                             <PrimaryBtn
//                                 label="Change profile picture"
//                                 className="bg-dtech-secondary-light max-w-fit"
//                             />
//                         </div>
//                         <HeaderValue
//                             header="Organisation"
//                             value={user.organisation}
//                             className="mb-2"
//                         />
//                         <HeaderValue
//                             header="Role"
//                             value={
//                                 user.role == Role.Other
//                                     ? user.roleOther
//                                     : startCase(user.role)
//                             }
//                             className="mb-2"
//                         />
//                         <HeaderValue
//                             header="Data owner"
//                             value={user.isDataOwner ? "Yes" : "No"}
//                             className="mb-2"
//                         />
//                         <HeaderValue
//                             header="Date joined"
//                             value={user.created_at.toLocaleString(
//                                 DateTime.DATE_FULL
//                             )}
//                             className="mb-2"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </DefaultLayout>
//     );
// };

// export default withAuth(AccountPage);

import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import { useSelector } from "react-redux";
import { RootState } from "store";
// import ListsSection from "./components/lists_section";
import { Tab } from "@headlessui/react";
import { ReactNode } from "react";
import TabHeader from "components/UI/tabbed/header";
import TabPanel from "components/UI/tabbed/panel";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import AccountDetailsTabPanel from "./components/account_details_tab_panel";

const WorkspacePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
        return (
            <ErrorAlert className="m-2" message="Please login to continue" />
        );
    }

    return (
        <DefaultLayout>
            <div className="text-center mb-10 text-lg font-semibold">
                My Account
            </div>
            <div className="mx-4 md:mx-20 border">
                <Tab.Group>
                    <Tab.List className="flex flex-row justify-between">
                        <MyAccountTabHeader
                            text="Account details"
                            icon={<FaRegUserCircle />}
                        />
                        <MyAccountTabHeader
                            text="Subscription"
                            icon={<BsClipboardCheck />}
                        />
                        <MyAccountTabHeader
                            text="Payment"
                            icon={<MdOutlinePayment />}
                        />
                    </Tab.List>
                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                        {/* <TabPanel> */}
                            <AccountDetailsTabPanel />
                        {/* </TabPanel> */}
                        <TabPanel>
                            <p>Work in progress.</p>
                        </TabPanel>
                        <TabPanel>
                            <p>Work in progress.</p>
                        </TabPanel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </DefaultLayout>
    );
};

const MyAccountTabHeader = ({
    text,
    icon,
}: {
    text: string;
    icon: ReactNode;
}) => {
    return (
        <TabHeader className="flex flex-col items-center">
            <span className="text-xl text-gray-500 w-min mb-1">{icon}</span>
            <h4 className="text-sm font-medium">{text}</h4>
        </TabHeader>
    );
};

export default withAuth(WorkspacePage);

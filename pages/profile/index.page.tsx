import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import { DateTime } from "luxon";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "store";
import DataOwnerSection from "./components/data_owner_section";
import HeaderValue from "./components/header_value";
import TabbedSection from "./components/tabbed_section/tabbed_section";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <ErrorAlert message="Please login to continue" />;
  }

  return (
    <DefaultLayout>
      <div className="mx-4 md:mx-20">
        <div className="md:flex border-b">
          <div className="w-52 p-3 relative mx-auto">
            <Image
              src="/images/icons/profile/guest_Icon.svg"
              width="40"
              height="40"
              layout="responsive"
              alt="profile img"
            />
          </div>
          <div className="w-full flex flex-col justify-center md:w-3/4 ml-auto">
            <div className="flex items-center mb-3">
              <h3 className="font-medium mr-10 text-lg text-gray-700">
                {user.name ?? user.email}
              </h3>
              <PrimaryBtn
                label="Change profile picture"
                className="bg-dtech-secondary-light max-w-fit"
              />
            </div>
            <HeaderValue
              header="Organisation"
              value={user.organisation}
              className="mb-2"
            />
            <HeaderValue
              header="Role"
              value={user.user_type}
              className="mb-2"
            />
            <HeaderValue
              header="Date joined"
              value={user.created_at.toLocaleString(DateTime.DATE_FULL)}
              className="mb-2"
            />
          </div>
        </div>
        <div className="md:flex">
          <DataOwnerSection className="md:w-3/12" />
          <TabbedSection />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withAuth(ProfilePage);

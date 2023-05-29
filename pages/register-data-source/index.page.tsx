import DefaultLayout from "components/layouts/default";
import InfoIcon from "components/UI/icons/info_icon";
import PrimaryBtn from "components/UI/form/primary_btn";
import RegisterDataSourceVM from "./register_data_source.vm";
import withAuth from "common/HOCs/with_auth";
import SuccessScreen from "./components/success_screen";
import SiteUrl from "./components/form-rows/SiteUrl";
import SiteName from "./components/form-rows/SiteName";
import Domain from "./components/form-rows/Domain";
import MetadataLevel from "./components/form-rows/MetadataLevel";
import SitemapAvailability from "./components/form-rows/SitemapAvailability";
import UpdateFrequency from "./components/form-rows/UpdateFrequency";
import Comment from "./components/form-rows/Comment";
import ContactEmail from "./components/form-rows/ContactEmail";
import UsageRights from "./components/form-rows/UsageRights";
import DownloadStatus from "./components/form-rows/DownloadStatus";
import DataType from "./components/form-rows/DataType";
import DataManagementSystem from "./components/form-rows/DataManagementSystem";
import MetadataStandards from "./components/form-rows/MetadataStandards";
import DataDuplication from "./components/form-rows/DataDuplication";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import DataProviderType from "./components/form-rows/DataProviderType";

const RegisterDataSourcePage = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const vm = RegisterDataSourceVM();

    return (
        <DefaultLayout>
            <div className="grow flex flex-col p-4">
                <div className="mx-4 md:mx-20 flex">
                    <span className="text-left text-[26px] font-semibold">
                        REGISTER A DATA SOURCE
                    </span>
                </div>
                <div className="my-4 mx-4 md:mx-20">
                    <span>
                        If you would like to see the datasets from a data source
                        website in the Dtechtive search results, we recommend
                        you to register the website using the form provided
                        below. We will do the hard work to get them onto
                        Dtechtive.
                    </span>
                </div>
                <div className=" md:px-16 ">
                    {vm.isSubmissionSuccess && <SuccessScreen />}
                    {!vm.isSubmissionSuccess && (
                        <div className="justify-center max-w-site m-auto border-t-2">
                            <div className="mt-0 mb-4 text-sm py-2 px-4">
                                <span className="font-semibold text-xl ">
                                    Required fields
                                </span>
                                <div className="">
                                    These fields are necessary for us to start
                                    the indexing process.
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-4 mt-4 ">
                                <SiteUrl vm={vm} />
                                <SiteName vm={vm} />
                                <Domain vm={vm} />
                                <UsageRights vm={vm} />
                                <DownloadStatus vm={vm} />
                                <MetadataLevel vm={vm} />
                                <ContactEmail vm={vm} />
                            </div>
                            {/* Optional-Advanced  */}

                            <div className="flex flex-col">
                                {!showAdvanced ? (
                                    <div
                                        className={`mt-2 mb-4 cursor-pointer mx-auto flex text-sm py-2 px-4 rounded-sm`}
                                        onClick={() => {
                                            setShowAdvanced(!showAdvanced);
                                        }}
                                    >
                                        <span>
                                            <span className="font-semibold">
                                                Advanced fields:
                                            </span>{" "}
                                            <span className="text-gray-500">
                                                The additional information will
                                                help us scrape the metadata
                                                faster.
                                            </span>
                                        </span>
                                        <span>
                                            {showAdvanced ? (
                                                <BsChevronUp className="ml-8" />
                                            ) : (
                                                <BsChevronDown className="ml-8" />
                                            )}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="mt-0 mb-4 text-sm py-2 px-4 max-w-fit">
                                        <div
                                            className={`mt-2 mb-4 cursor-pointer mx-auto flex-col text-sm  rounded-sm`}
                                            onClick={() => {
                                                setShowAdvanced(!showAdvanced);
                                            }}
                                        >
                                            <span className="font-semibold text-xl ">
                                                Advanced fields:
                                            </span>
                                            <div className="flex flex-row">
                                                The additional information will
                                                help us scrape the metadata
                                                faster.
                                            <span>
                                                {showAdvanced ? (
                                                    <BsChevronUp className="ml-8" />
                                                ) : (
                                                    <BsChevronDown className="ml-8" />
                                                )}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`${
                                        showAdvanced ? "" : "hidden "
                                    } transition-2 ease-in-out delay-150 duration-300`}
                                >
                                    <div className="grid md:grid-cols-2 md:gap-4 mt-4 ">
                                        <DataType vm={vm} />
                                        <DataProviderType vm={vm} />
                                        <DataManagementSystem vm={vm} />
                                        <MetadataStandards vm={vm} />
                                        <UpdateFrequency vm={vm} />
                                        <SitemapAvailability vm={vm} />
                                        <DataDuplication vm={vm} />
                                        <Comment vm={vm} />
                                    </div>
                                </div>
                            </div>

                            <PrimaryBtn
                                label="Submit"
                                className="bg-dtech-main-dark w-48 mt-5 mb-2 mx-auto"
                                isLoading={vm.isRegisteringDataSource}
                                onClick={vm.form.handleSubmit(
                                    vm.registerDataSource
                                )}
                            />
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default withAuth(RegisterDataSourcePage);

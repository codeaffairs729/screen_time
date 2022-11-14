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

const RegisterDataSourcePage = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const vm = RegisterDataSourceVM();

    return (
        <DefaultLayout>
            <div className="grow flex flex-col">
                <div className="text-center mt-8 mb-4">
                    <h1 className="font-semibold text-lg">
                        Register a Data Source
                    </h1>
                    <span className="inline-flex space-x-1">
                        <i className="mr-1 text-sm underline">Need help?</i>{" "}
                        <InfoIcon
                            className="ml-1"
                            title="Register a new data source"
                        />
                    </span>
                </div>
                {vm.isSubmissionSuccess && <SuccessScreen />}
                {!vm.isSubmissionSuccess && (
                    <div className="justify-center max-w-site m-auto">
                        <div className="mt-2 mb-4 text-sm py-2 px-4">
                            <span className="font-semibold text-dtech-primary-dark">
                                Required fields:
                            </span>{" "}
                            <span className="text-gray-500">
                                These fields are necessary for us to start the
                                indexing process.
                            </span>
                        </div>
                        <SiteUrl vm={vm} />
                        <SiteName vm={vm} />
                        <Domain vm={vm} />
                        <UsageRights vm={vm} />
                        <DownloadStatus vm={vm} />
                        <MetadataLevel vm={vm} />
                        <ContactEmail vm={vm} />

                        {/* Optional-Advanced  */}

                        <div className="">
                            <div
                                className={`mt-2 mb-4 cursor-pointer flex justify-between text-sm py-2 px-4 rounded-sm ${
                                    !showAdvanced && "bg-gray-100"
                                }`}
                                onClick={() => {
                                    setShowAdvanced(!showAdvanced);
                                }}
                            >
                                <span>
                                    <span className="font-semibold">
                                        Advanced fields:
                                    </span>{" "}
                                    <span className="text-gray-500">
                                        The additional information will help us
                                        index the data source websites faster
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

                            <div
                                className={`${
                                    showAdvanced ? "" : "hidden "
                                } transition-2 ease-in-out delay-150 duration-300`}
                            >
                                <DataType vm={vm} />
                                <DataManagementSystem vm={vm} />
                                <MetadataStandards vm={vm} />
                                <UpdateFrequency vm={vm} />
                                <SitemapAvailability vm={vm} />
                                <DataDuplication vm={vm} />
                                <Comment vm={vm} />
                            </div>
                        </div>

                        <PrimaryBtn
                            label="Submit"
                            className="bg-dtech-primary-dark w-48 mt-5 mb-2 mx-auto"
                            isLoading={vm.isRegisteringDataSource}
                            onClick={vm.form.handleSubmit(
                                vm.registerDataSource
                            )}
                        />
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default withAuth(RegisterDataSourcePage);

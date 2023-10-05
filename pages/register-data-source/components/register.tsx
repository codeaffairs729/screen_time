import { useState } from "react";
import SiteUrl from "./form-rows/SiteUrl";
import SiteName from "./form-rows/SiteName";
import Domain from "./form-rows/Domain";
import UsageRights from "./form-rows/UsageRights";
import DownloadStatus from "./form-rows/DownloadStatus";
import MetadataLevel from "./form-rows/MetadataLevel";
import ContactEmail from "./form-rows/ContactEmail";
import RegisterDataSourceVM from "../register_data_source.vm";
import SuccessScreen from "./success_screen";
import DataType from "./form-rows/DataType";
import DataProviderType from "./form-rows/DataProviderType";
import DataManagementSystem from "./form-rows/DataManagementSystem";
import MetadataStandards from "./form-rows/MetadataStandards";
import UpdateFrequency from "./form-rows/UpdateFrequency";
import SitemapAvailability from "./form-rows/SitemapAvailability";
import DataDuplication from "./form-rows/DataDuplication";
import Comment from "./form-rows/Comment";
import PrimaryBtn from "components/UI/form/primary_btn";

const Register = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const vm = RegisterDataSourceVM();
    return (
        <div className="md:px-[50px] base:px-[100px] lg:px-[170px] xl:px-[280px] 2xl:px-[370px]">
            <div className="flex flex-col justify-center items-center">
                <img className="w-[200px] sm:w-[326px] my-5" src="/images/register_data_source_logo.svg" />
                <div className="text-[#727272] text-center text-s sm:text-[22px] font-[700]">
                    Register your favourite data source website using the form
                    below, and we&apos;ll work our magic to bring those awesome
                    datasets to Dtechtive&apos;s search results!
                </div>
            </div>
            <div className="grow flex flex-col p-4">
                {vm.isSubmissionSuccess && <SuccessScreen />}
                {!vm.isSubmissionSuccess && (
                    <div className="justify-center">
                        <div className="md:gap-4 mt-4 ">
                            <SiteUrl vm={vm} />
                            <Domain vm={vm} />
                            <DownloadStatus vm={vm} />
                            <ContactEmail vm={vm} />
                            <SiteName vm={vm} />
                            <UsageRights vm={vm} />
                            <MetadataLevel vm={vm} />
                        </div>
                        {/* Optional-Advanced  */}
                        <div className="flex flex-col my-8 shadow-[4px_4px_20px_rgba(0,0,0,0.1)] text-center sm:w-[full] py-5 justify-center items-center">
                            <p className="font-semibold mb-5 text-s sm:text-[19px]">Advanced Fields</p>
                            <p className="text-gray-500 mb-5 text-s sm:text-[19px]">Additional information about this data source.</p>
                            <PrimaryBtn
                                label={showAdvanced ? "Show Less" : "Show More"}
                                dropdownIcon={true}
                                isOpen={showAdvanced}
                                className="text-[#6E498E] border-[#6E498E] border-2 w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] mt-5 mb-2 text-xs sm:text-[16px]"
                                onClick={() => {
                                    setShowAdvanced(!showAdvanced);
                                }}
                                iconClass="w-4 h-4"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div
                                className={`${
                                    showAdvanced ? "" : "hidden "
                                } transition-2 ease-in-out delay-150 duration-300`}
                            >
                                <div className="md:gap-4 mt-4 ">
                                    <DataType vm={vm} />
                                    <DataManagementSystem vm={vm} />
                                    <UpdateFrequency vm={vm} />
                                    <DataDuplication vm={vm} />
                                    <DataProviderType vm={vm} />
                                    <MetadataStandards vm={vm} />
                                    <SitemapAvailability vm={vm} />
                                    <Comment vm={vm} />
                                </div>
                            </div>
                        </div>

                        <PrimaryBtn
                            label="Submit"
                            className="bg-[#6E498E] w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] mt-5 mb-2 text-xs sm:text-[16px]"
                            isLoading={vm.isRegisteringDataSource}
                            onClick={vm.form.handleSubmit(
                                vm.registerDataSource
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
export default Register;

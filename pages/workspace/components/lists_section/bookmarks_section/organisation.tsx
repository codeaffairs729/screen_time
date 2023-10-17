import ResultCard from "components/UI/result_card";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { DateTime } from "luxon";
import { organisationToResultCardData } from "pages/search/organisation/organisation.vm";

const OrganisationBookmarksSection = ({ orgIDS }: { orgIDS: any }) => {
    const bookmarkItemsData = useSelector(
        (state: RootState) => state.user.bookmarkItemsData
    );

    const organisations = bookmarkItemsData?.organisations?.filter(
        (organisation: any) => orgIDS.includes(organisation.uuid)
    );

    return (
        <div>
            {organisationToResultCardData(organisations).map((organisation: any) => (
                <ResultCard
                    key={organisation.uuid}
                    data={{
                        ...organisation,
                        recordType: "organisation",
                        lastUpdate: DateTime.fromISO(
                            new Date("12-25-2022").toISOString()
                        ),
                    }}
                    // hideResultCard={true}
                    className=" md:!pr-0 !py-0 !border-r-0 !rounded-lg !bg-white !shadow-md !p-4"
                    showToolTip={true}
                    pageName="workspace"
                    label="data_provider"
                />
            ))}
            {/* <DatasetList datasets={datasets} stats={stats} /> */}
        </div>
    );
};

export default OrganisationBookmarksSection;

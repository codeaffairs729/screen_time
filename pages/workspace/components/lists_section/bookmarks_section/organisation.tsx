import ResultCard from "components/UI/result_card";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { DateTime } from "luxon";

const OrganisationBookmarksSection = ({ orgIDS }: { orgIDS: any }) => {
    const bookmarkItemsData = useSelector(
        (state: RootState) => state.user.bookmarkItemsData
    );

    const organisations = bookmarkItemsData?.organisations?.filter(
        (organisation: any) => orgIDS.includes(organisation.id)
    );

    return (
        <div>
            {organisations.map((organisation: any) => (
                <ResultCard
                    key={organisation.id}
                    data={{
                        ...organisation,
                        recordType: "organisation",
                        lastUpdate: DateTime.fromISO(
                            new Date("12-25-2022").toISOString()
                        ),
                    }}
                />
            ))}
            {/* <DatasetList datasets={datasets} stats={stats} /> */}
        </div>
    );
};

export default OrganisationBookmarksSection;

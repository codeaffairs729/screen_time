import { Key } from "react";
import OrganizationResult from "./organization_result";
import { useContext } from "react";
import { OrganizationSearchVMContext } from "pages/search/organisation.vm";
import NoResults from "../../no_results";
import { useRouter } from "next/router";
const OraganizationTable = () => {
    const router = useRouter();
    const {
        query: { q },
    } = router;
    const vm = useContext(OrganizationSearchVMContext);

    if (!vm.datasets?.length) {
        return (
            <div className="w-full flex items-start justify-center">
                <NoResults
                    message={`No results found for ${q}.`}
                    subMessages={[
                        "Try different keywords.",
                        "Make sure that all words are spelled correctly.",
                    ]}
                />
            </div>
        );
    }

    return (
        <>
            {vm.datasets?.map(
                (dataset: { id: Key | null | undefined }, i: any) => (
                    <OrganizationResult key={dataset.id} dataset={dataset} />
                )
            )}
        </>
    );
};

export default OraganizationTable;

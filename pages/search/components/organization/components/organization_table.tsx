import { Key } from "react";
import OrganizationResult from "./organization_result";
import { useContext } from "react";
import { OrganizationSearchVMContext } from "pages/search/organisation.vm";
const OraganizationTable = () => {
    const vm = useContext(OrganizationSearchVMContext);
    console.log(vm.datasets);
    return (
        <>
            {vm.datasets?.map((dataset: { id: Key | null | undefined }, i: any) => (
                <OrganizationResult key={dataset.id} dataset={dataset} />
            ))}
        </>
    );
};

export default OraganizationTable;

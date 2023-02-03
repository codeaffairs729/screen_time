import PieGraph from "components/UI/PieGraph";
const useCaseData = [
    { name: "Data modelling", value: 400 },
    { name: "Publications", value: 300 },
    { name: "Planning", value: 200 },
];
const DatasetUseCasesBody = () => {
    return (
        <div className="mr-24 mt-8 block h-[44rem] overflow-y-scroll no-scrollbar whitespace-nowrap">
            <PieGraph data={useCaseData} />
        </div>
    );
};
export default DatasetUseCasesBody;

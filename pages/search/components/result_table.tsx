import TableBody from "./table_body";
import TableHeader from "./table_header";

const ResultTable = () => {
  // 2fr repeat(5, minmax(200px, 1fr))
  return (
    <div className="overflow-x-auto">
      <div className="grid gap-px [grid-template-columns:2fr_repeat(5,120px)] p-px w-full">
        <TableHeader />
        <TableBody />
      </div>
    </div>
  );
};

export default ResultTable;

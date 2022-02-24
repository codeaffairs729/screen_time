import clsx from "clsx";
import DatasetDownload from "./dataset_download";
import Favourite from "components/UI/buttons/favourite";
import StarRating from "components/UI/star_rating";
import { DateTime } from "luxon";
import Dataset from "models/dataset.model";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { SearchVMContext } from "../search.vm";

const TableBody = () => {
  const vm = useContext(SearchVMContext);

  if (vm.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {vm.datasets?.map((dataset, i) => (
        <Row key={i} dataset={dataset} />
      ))}
    </>
  );
};

const Row = ({ dataset }: { dataset: Dataset }) => {
  return (
    <>
      <Cell className="min-w-[350px]">
        <div>
          <h4 className="font-semibold text-sm">
            <Link href={`/datasets/${dataset.id}`}>
              <a className="hover:text-dtech-secondary-light">
                {dataset.detail.name}
              </a>
            </Link>
          </h4>
          <p className="text-xs text-gray-800">{dataset.detail.description}</p>
          <DatasetDownload urls={dataset.urls} />
        </div>
      </Cell>
      <Cell className="text-center">
        {<StarRating rating={dataset.detail.popularity} />}
      </Cell>
      <Cell className="text-center">
        {<StarRating rating={dataset.detail.dataQuality} />}
      </Cell>
      <Cell className="text-xs text-center pt-1 font-medium text-gray-700">
        {dataset.detail.lastUpdate.toLocaleString({ ...DateTime.DATE_FULL })}
      </Cell>
      <Cell>{dataset.detail.lastDownloaded}</Cell>
      <Cell className="text-center pt-1">
        <Favourite isFavourited={dataset.detail.isFavourited} />
      </Cell>
    </>
  );
};

const Cell = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "outline outline-1 outline-gray-300 px-2 py-1",
        className
      )}
    >
      {children}
    </div>
  );
};

// const DatasetDownload = ({ label, url }: { label: string; url: string }) => {
//   const newUrl = url?.replace(/["']/g, "");

//   return (
//     <a href={newUrl} className="flex" download>
//       <Image
//         src="/images/icons/folder.svg"
//         width="20px"
//         height="20px"
//         alt="folder icon"
//       />
//       <span className="text-xs font-medium">{label}</span>
//     </a>
//   );
// };

export default TableBody;

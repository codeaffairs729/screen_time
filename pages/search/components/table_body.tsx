import clsx from "clsx";
import DatasetDownload from "components/dataset/dataset_download";
import LabelledRow from "components/dataset/labelled_row";
import FavouriteBtn from "components/UI/buttons/favourite_btn";
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
          <h4 className="font-semibold text-sm mb-1">
            <Link href={`/datasets/${dataset.id}`}>
              <a className="hover:text-dtech-secondary-light">
                {dataset.detail.name}
              </a>
            </Link>
          </h4>
          <p className="text-xs text-gray-800 mb-1.5">
            {dataset.detail.description}
          </p>
          <DatasetDownload dataset={dataset} className="mb-2" />
          <LabelledRow className="mb-1.5" label="Data Host">
            <a
              href={dataset.detail.hostUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs underline"
            >
              {dataset.detail.hostName}
            </a>
          </LabelledRow>
          <LabelledRow className="mb-1.5" label="Data Owner">
            {dataset.owner.name}
          </LabelledRow>
          <LabelledRow className="mb-1.5" label="License">
            {dataset.detail.license.type}
          </LabelledRow>
        </div>
      </Cell>
      <Cell className="text-center">
        {<StarRating rating={dataset.detail.popularity} />}
      </Cell>
      <Cell className="text-center">
        {<StarRating rating={dataset.detail.dataQuality} />}
      </Cell>
      <Cell className="text-xs text-center pt-1 font-medium text-gray-700">
        {dataset.detail.lastUpdate.isValid
          ? dataset.detail.lastUpdate.toLocaleString({ ...DateTime.DATE_FULL })
          : ""}
      </Cell>
      <Cell>
        {dataset.detail.lastDownloaded.isValid
          ? dataset.detail.lastDownloaded.toLocaleString({
              ...DateTime.DATE_FULL,
            })
          : ""}
      </Cell>
      <Cell className="text-center pt-1">
        <FavouriteBtn
          className="mx-auto"
          dataset={dataset}
        />
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

export default TableBody;

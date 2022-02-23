import clsx from "clsx";
import Favourite from "components/UI/buttons/favourite";
import StarRating from "components/UI/star_rating";
import { DateTime } from "luxon";
import Dataset from "models/dataset.model";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { SearchVMContext } from "../search.vm";

const data = [
  {
    id: "1437",
    dataset: {
      domain: "General",
      hostURL:
        "https://statistics.gov.scot/resource?uri=http%3A%2F%2Fstatistics.gov.scot%2Fdata%2Fhome-care-client-group",
      hostName: "Statistics",
      name: "Home Care Client Group",
      description:
        "Data on social care provided or purchased by Local Authorities from the Social Care Survey (Home Care Census prior to 2013), for the week that includes 31 March of the given year.",
      lastupdate: "2017-05-25T15:58:05+00:00",
      licence: {
        type: "Open Government Licence",
        version: "3.0",
      },
      topics: "['census', 'client', 'week', 'home', 'group']",
      keywords: ["migration", "species"],
      locations: ["United Kingdom", "Scotland"],
      dataquality: "3.6385405781957503",
      popularity: "5",
      userlike: false,
      userunlike: false,
      userfavourite: false,
      like_count: 0,
      unlike_count: 0,
      favourite_count: 0,
      lastdownloaded: "2017-05-25T15:58:05+00:00",
    },
    owner: {
      name: "John Smith",
      organisation: " Scottish Government ",
      contact: {
        email: "mailto:statistics.enquiries@scotland.gsi.gov.uk",
        phone: "01234 567890",
        twitter: "@johnsmith",
      },
      relatedOrganizations: [
        "Scottish National Heritage",
        "Nature Scotland",
        "RSPB",
      ],
    },
    urls: [
      {
        type: "download",
        format: "CSV",
        version: "null",
        sizemb: "17.2",
        url: "https://statistics.gov.scot/downloads/cube-table?uri=http%3A%2F%2Fstatistics.gov.scot%2Fdata%2Fhome-care-client-group",
      },
      {
        type: "download",
        format: "N-TRIPLES",
        version: "null",
        sizemb: "17.2",
        url: "https://statistics.gov.scot/downloads/graph?uri=http://statistics.gov.scot/graph/home-care-client-group",
      },
    ],
  },
];
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
            <Link href={`/dataset/${dataset.id}`}>
              <a className="hover:text-dtech-secondary-light">{dataset.detail.name}</a>
            </Link>
          </h4>
          <p className="text-xs text-gray-800">{dataset.detail.description}</p>
          {dataset.urls.length > 0 && (
            <div className="flex">
              <span className="text-sm font-semibold">Data:</span>
              <div>
                {dataset.urls.map((url, i) => (
                  <DatasetDownload
                    key={i}
                    label={`${url.format}`}
                    url={url.url}
                  />
                ))}
              </div>
            </div>
          )}
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

const DatasetDownload = ({ label, url }: { label: string; url: string }) => {
  const newUrl = url?.replace(/["']/g, "");

  return (
    <a href={newUrl} className="flex" download>
      <Image
        src="/images/icons/folder.svg"
        width="20px"
        height="20px"
        alt="folder icon"
      />
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
};

export default TableBody;

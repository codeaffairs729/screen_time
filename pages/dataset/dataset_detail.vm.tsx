import Dataset from "models/dataset.model";
import { createContext } from "react";
import useSWR from "swr";

const DatasetDetailVM = () => {
  // const { data: dataset, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API_ROOT}/v2/dataset?searchterm=${q}`,
  //   (url: string) =>
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((res) =>
  //         Dataset.fromJson(
  //           res?.[0]?.["user_search"]?.[0]?.["results"].slice(0, 10)
  //         )
  //       )
  // );
  const dataset = Dataset.fromJson({
    id: "1242",
    dataset: {
      domain: "General",
      hostURL:
        "https://statistics.gov.scot/resource?uri=http%3A%2F%2Fstatistics.gov.scot%2Fdata%2Fpupil-attainment-asn",
      hostName: "Statistics",
      name: "Pupil Attainment (Additional Support Needs)",
      description:
        "This indicator relates to pupils attending publicly funded secondary schools, it does not include: Pupils attending publicly funded Special Schools; Pupils attending private Independent Schools; Pupils educated outwith the school education system (for example at home) or Adults attending publicly funded secondary schools. Pupil Numbers The number of pupils on the roll is taken from the September Scottish School Census for the relevant year, which was carried out through the Scottish Exchange of Educational Data (ScotXed) project.",
      lastupdate: "2021-03-31T12:23:02+00:00",
      licence: {
        type: "Open Government Licence",
        version: "3.0",
      },
      topics: "['pupils', 'pupil', 'education', 'schools', 'attainment']",
      keywords: ["migration", "species"],
      locations: ["United Kingdom", "Scotland"],
      dataquality: "3.46933729623701",
      popularity: "1",
      userlike: false,
      userunlike: false,
      userfavourite: false,
      like_count: 0,
      unlike_count: 0,
      favourite_count: 0,
      lastdownloaded: "null",
      displays: 0,
      views: 0,
      downloads: 0,
      sentiment: "positive",
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
        format: "N-TRIPLES",
        version: "null",
        sizemb: "17.2",
        url: "'https://statistics.gov.scot/resource.nt?uri=http%3A%2F%2Fstatistics.gov.scot%2Fdata%2Fpupil-attainment-asn'",
      },
    ],
  });
  console.log("dataset", dataset);

  return { dataset };
};

export const DatasetDetailVMContext = createContext<{
  dataset: Dataset | undefined;
}>({ dataset: undefined });

export default DatasetDetailVM;

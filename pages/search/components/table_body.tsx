import { ReactNode } from "react";

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
  return (
    <>
      {data.map((rowData, i) => (
        <Row key={i} data={rowData} />
      ))}
    </>
  );
};

const Row = ({ data }: { data: { [key: string]: any } }) => {
  console.log('data', data, data?.dataset?.name);
  
  return (
    <>
      <Cell>
        <div>
          <h4>{data?.dataset?.name}</h4>
          <p>{data?.dataset?.description}</p>
        </div>
      </Cell>
      <Cell>popularity stars</Cell>
      <Cell>quality stars</Cell>
      <Cell>last updated</Cell>
      <Cell>last downloaded</Cell>
      <Cell>Favourites</Cell>
    </>
  );
};

const Cell = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default TableBody;

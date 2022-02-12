import { DateTime } from "luxon";

class Dataset {
  constructor({
    id,
    detail,
    owner,
    urls,
  }: {
    id: number;
    detail: DatasetDetail;
    owner: DatasetOwner;
    urls: string[];
  }) {
    this.id = id;
    this.detail = detail;
    this.owner = owner;
    this.urls = urls;
  }

  id: number;
  detail: DatasetDetail;
  owner: DatasetOwner;
  urls: string[];

  static fromJson(json: { [key: string]: any }) {
    // if (!json) return null;
    let topics = json["dataset"]["topics"];
    if (typeof topics === "string") {
      // TODO: Remove this once api is fixed and topics is actually an array
      topics = topics.replace(/'/g, '"');
      topics = JSON.parse(topics);
    }
    topics = topics.join(", ");
    return new Dataset({
      id: Number(json["id"]),
      detail: {
        domain: json["dataset"]["domain"],
        hostUrl: json["dataset"]["hostURL"],
        hostName: json["dataset"]["hostName"],
        name: json["dataset"]["name"],
        description: json["dataset"]["description"],
        lastUpdate: json["dataset"]["lastupdate"],
        // license: json["dataset"]["licence"],
        license: {
          type: json["dataset"]["licence"]["type"],
          version: json["dataset"]["licence"]["version"],
        },
        topics: topics,
        keywords: json["dataset"]["keywords"],
        locations: json["dataset"]["locations"],
        dataQuality: json["dataset"]["dataquality"],
        popularity: json["dataset"]["popularity"],
        isLiked: json["dataset"]["userlike"],
        isDisliked: json["dataset"]["userunlike"],
        isFavourited: json["dataset"]["userfavourite"],
        likes: json["dataset"]["like_count"],
        dislikes: json["dataset"]["unlike_count"],
        favourites: json["dataset"]["favourite_count"],
        lastDownloaded: json["dataset"]["lastdownloaded"],
        displays: json["dataset"]["displays"],
        views: json["dataset"]["views"],
        downloads: json["dataset"]["downloads"],
        sentiment: json["dataset"]["sentiment"],
      },
      owner: {
        name: json["owner"]["name"],
        organisation: json["owner"]["organisation"],
        contact: {
          email: json["owner"]["contact"]["email"],
          phone: json["owner"]["contact"]["phone"],
          twitter: json["owner"]["contact"]["twitter"],
        },
        relatedOrganizations: json["owner"]["relatedOrganizations"],
      },
      urls: json["urls"],
    });
  }

  static fromJsonList(jsonList: { [key: string]: any }[]) {
    // if(!jsonList) return null;
    return jsonList?.map(Dataset.fromJson);
  }
}

export type DatasetLicense = {
  type: string;
  version: string;
};

export type DatasetDetail = {
  domain: string;
  hostUrl: string;
  hostName: string;
  name: string;
  description: string;
  lastUpdate: DateTime;
  license: DatasetLicense;
  topics: string[];
  keywords: string[];
  locations: string[];
  dataQuality: number;
  popularity: number;
  isLiked: boolean;
  isDisliked: boolean;
  isFavourited: boolean;
  likes: number;
  dislikes: number;
  favourites: number;
  lastDownloaded: DateTime;
  displays: number;
  views: number;
  downloads: number;
  sentiment: string;
};

export type DatasetOwner = {
  name: string;
  organisation: string;
  contact: {
    email: string;
    phone: string;
    twitter: string;
  };
  relatedOrganizations: string[];
};

export default Dataset;

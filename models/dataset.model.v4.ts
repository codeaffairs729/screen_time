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
        urls: DatasetUrl[];
    }) {
        this.id = id;
        this.detail = detail;
        this.owner = owner;
        this.urls = urls;
    }

    id: number;
    detail: DatasetDetail;
    owner: DatasetOwner;
    urls: DatasetUrl[];

    static fromJson(json: { [key: string]: any }) {
        // if (!json) return null;
        let topics = json["dataset"]["topics"];
        if (typeof topics === "string") {
            // TODO: Remove this once api is fixed and topics is actually an array
            topics = topics.replace(/'/g, '"');
            topics = JSON.parse(topics);
        }

        const { id, dataset } = json || {};
        const { licence, metrics, data_owner, data_host, download_files } =
            dataset || {};
        const { user, global } = metrics || {};
        const { contacts } = data_owner || {};

        return new Dataset({
            id: Number(id),
            detail: {
                domain: dataset["domains"],
                hostUrl: data_host["url"], // url -> dataset/data_host/url
                hostName: data_host["organisation"], // organisation -> /data_host/organisation
                hostUuid: data_host["uuid"],
                name: dataset["title"], // name -> title
                description: dataset["description"],
                lastUpdate: DateTime.fromISO(dataset["last_updated"]),
                // license: json["dataset"]["licence"],
                license: {
                    type: licence["type"],
                    version: licence["version"],
                },
                topics: topics,
                keywords: dataset["keywords"],
                locations: dataset["location"]["name"],
                popularity: dataset["popularity"],
                dataQuality: global["metadata_quality"], // data_quality -> metadata_quality
                likes: global["like_count"],
                dislikes: global["dislike_count"],
                favourites: global["favourite_count"],
                lastDownloaded: DateTime.fromISO(global["last_downloaded"]),
                displays: global["displays"],
                views: global["views"],
                downloads: global["downloads"],
                sentiment: global["sentiment"],
                isLiked: user["like"],
                isDisliked: user["dislike"],
                isFavourited: user["favourite"],
            },
            owner: {
                name: contacts[0]["name"],
                ownerUuid: data_owner["uuid"],
                organisation: data_owner["organisation"],
                contact: {
                    email: contacts[0]["email"],
                    phone: contacts[0]["phone"],
                    twitter: contacts[0]["twitter"],
                    role: contacts[0]["role"],
                },
                relatedOrganizations: data_owner["relatedOrganizations"],
            },
            urls: download_files.map(
                (download_file: { [key: string]: any }) => ({
                    description: download_file["description"],
                    type: download_file["type"],
                    format: download_file["format"],
                    version: download_file["version"],
                    sizemb: download_file["size_mb"],
                    url: download_file["url"],
                    lastUpdated: download_file["last_updated"],
                })
            ),
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
    domain: string[];
    hostUrl: string;
    hostName: string;
    hostUuid: string;
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
    ownerUuid: string;
    contact: {
        email: string;
        phone: string;
        twitter: string;
        role: string;
    };
    relatedOrganizations: string[];
};

export type DatasetUrl = {
    type: string;
    description: string;
    format: string;
    version: string;
    sizemb: string;
    url: string;
    lastUpdated: string;
};

export default Dataset;

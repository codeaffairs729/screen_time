import { DateTime } from "luxon";

class Dataset {
    constructor({
        id,
        detail,
        owner,
        host,
        urls,
    }: {
        id: number;
        detail: DatasetDetail;
        owner: DatasetOwner;
        host: DatasetHost;
        urls: DatasetUrl[];
    }) {
        this.id = id;
        this.detail = detail;
        this.owner = owner;
        this.host = host;
        this.urls = urls;
    }

    id: number;
    detail: DatasetDetail;
    owner: DatasetOwner;
    host: DatasetHost;
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
        const { contacts: contact } = data_host || {};
        return new Dataset({
            id: Number(id),
            detail: {
                domain: dataset["domains"],
                uuid: dataset["uuid"],
                datasetUrl: dataset["dataset_url"],
                hostUrl: data_host["url"], // url -> dataset/data_host/url
                hostName: data_host["organisation"], // organisation -> /data_host/organisation
                hostUuid: data_host["uuid"],
                name: dataset["title"], // name -> title
                description: dataset["description"],
                createdAt: DateTime.fromISO(dataset["created"]),
                lastUpdate: DateTime.fromISO(dataset["last_updated"]),
                // license: json["dataset"]["licence"],
                license: {
                    type: licence["type"],
                    version: licence["version"],
                    url: licence["url"],
                    usageRights: licence["usage_rights"],
                },
                topics: json["dataset"]["topics"],
                topic_ids: json["dataset"]["topic_ids"],
                keywords: dataset["keywords"],
                locations: dataset["location"]["name"],
                popularity: dataset["popularity"],
                dataQuality: global["metadata_quality"], // data_quality -> metadata_quality
                likes: 0,
                dislikes: 0,
                favourites: 0,
                lastDownloaded:
                    DateTime.fromISO(global["last_downloaded"]) ?? 0,
                displays: 0,
                views: 0,
                downloads: 0,
                sentiment: "",
                isLiked: false,
                isDisliked: false,
                isFavourited: false,
            },
            owner: {
                name: contacts[0]["name"],
                ownerUrl: data_owner["url"],
                uuid: data_owner["uuid"],
                organisation: data_owner["organisation"],
                contact: {
                    email: contacts[0]["email"],
                    phone: contacts[0]["phone"],
                    name: contacts[0]["name"],
                    role: contacts[0]["role"],
                },
                relatedOrganizations: data_owner["relatedOrganizations"],
            },
            host: {
                name: contact[0]["name"],
                hostUrl: data_host["url"],
                uuid: data_host["uuid"],
                organisation: data_host["organisation"],
                contact: {
                    email: contact[0]["email"],
                    phone: contact[0]["phone"],
                    name: contact[0]["name"],
                    role: contact[0]["role"],
                },
            },
            urls: download_files.map(
                (download_file: { [key: string]: any }) => ({
                    id: download_file["id"],
                    description: download_file["description"],
                    type: download_file["type"],
                    format: download_file["format"],
                    version: download_file["version"],
                    sizemb: download_file["size_mb"],
                    url: download_file["url"],
                    lastUpdated: download_file["last_updated"],
                    createdAt: download_file["created"],
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
    url: string;
    usageRights: string;
};

export type DatasetDetail = {
    domain: string[];
    uuid: string;
    datasetUrl: string;
    hostUrl: string;
    hostName: string;
    hostUuid: string;
    name: string;
    description: string;
    createdAt: DateTime;
    lastUpdate: DateTime;
    license: DatasetLicense;
    topics: string[];
    topic_ids: number[];
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
    ownerUrl: string;
    organisation: string;
    uuid: string;
    contact: {
        email: string;
        phone: string;
        name: string;
        role: string;
    };
    relatedOrganizations: string[];
};

export type DatasetHost = {
    name: string;
    hostUrl: string;
    organisation: string;
    uuid: string;
    contact: {
        email: string;
        phone: string;
        name: string;
        role: string;
    };
};

export type DatasetUrl = {
    id: number;
    type: string;
    description: string;
    format: string;
    version: string;
    sizemb: string;
    url: string;
    lastUpdated?: string;
    createdAt?: string;
};

export default Dataset;

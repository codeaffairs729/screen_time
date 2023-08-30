import { DateTime } from "luxon";

class Organisation {
    constructor({
        id,
        uuid,
        title,
        imgUrl,
        description,
        dataQuality,
        buttonTags,
        domains,
        topics,
        stats,
        isFavourited,
        lastUpdate,
        url,
        topic_image,
    }: OrganisationDetail) {
        this.id = id;
        this.uuid = uuid;
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.dataQuality = dataQuality;
        this.buttonTags = buttonTags;
        this.domains = domains;
        this.topics = topics;
        this.stats = stats;
        this.isFavourited = isFavourited;
        this.lastUpdate = lastUpdate;
        this.url = url;
        this.topic_image = topic_image;
    }
    id: number;
    uuid: string;
    title: string;
    imgUrl: string;
    description: string;
    dataQuality: number;
    buttonTags: string[];
    domains: string[];
    topics: string[];
    stats: DataStats;
    isFavourited: boolean;
    lastUpdate: DateTime;
    url: string;
    topic_image: string;

    static fromJson(json: { [key: string]: any }) {
        const domains =
            typeof json["domains"] == "string"
                ? json["domains"].split(",")
                : json["domains"];

        const topics =
            typeof json["topics"] == "string"
                ? json["topics"].split(",")
                : json["topics"];

        return new Organisation({
            id: Number(json["uuid"]),
            uuid: json["uuid"],
            imgUrl: json["logo_url"],
            title: json["title"],
            description: json["description"],
            dataQuality: json["data_quality"],
            buttonTags: json["license_types"],
            domains: domains,
            topics: topics,
            isFavourited: json["is_favourited"],
            stats: {
                datasetsCount: json["dataset_count"],
                favoritesCount: json["favorites_count"],
                viewCount: json["view_count"],
                downloadCount: json["download_count"],
            },
            lastUpdate: json["last_updated"],
            url: json["url"],
            topic_image: json["topic_image"],
        });
    }

    static fromJsonList(jsonList: { [key: string]: any }[]) {
        // if(!jsonList) return null;
        return jsonList?.map(Organisation.fromJson);
    }
}

export type OrganisationDetail = {
    id: number;
    uuid: string;
    title: string;
    imgUrl: string;
    description: string;
    dataQuality: number;
    buttonTags: string[];
    domains: string[];
    topics: string[];
    lastUpdate: DateTime;
    stats: DataStats;
    isFavourited: boolean;
    url: string;
    topic_image: string;
};

export type DataStats = {
    datasetsCount: number;
    favoritesCount: number;
    viewCount: number;
    downloadCount: number;
};
export default Organisation;

import { DateTime } from "luxon";

class Organisation {
    constructor({
        id,
        title,
        description,
        dataQuality,
        buttonTags,
        domains,
        topics,
        stats,
        lastUpdate,
    }: {
        id: number;
        title: string;
        description: string;
        dataQuality: number;
        buttonTags: string[];
        domains: string[];
        topics: string[];
        lastUpdate: DateTime;
        stats: OrganisationStats;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dataQuality = dataQuality;
        this.buttonTags = buttonTags;
        this.domains = domains;
        this.topics = topics;
        this.stats = stats;
        this.lastUpdate = lastUpdate;
    }
    id: number;
    title: string;
    description: string;
    dataQuality: number;
    buttonTags: string[];
    domains: string[];
    topics: string[];
    stats: OrganisationStats;
    lastUpdate: DateTime;

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
            id: Number(json["id"]),
            title: json["title"],
            description: json["description"],
            dataQuality: 3, // Need to know where to fetch this.
            buttonTags: ["open"], // Need to know where to fetch this.
            domains: domains,
            topics: topics,
            stats: {
                datasetsCount: json["dataset_count"],
                favoritesCount: json["favorites_count"],
                viewCount: json["view_count"],
                downloadCount: json["download_count"],
            },
            lastUpdate: DateTime.fromISO(new Date("12-25-2022").toISOString()),
        });
    }

    static fromJsonList(jsonList: { [key: string]: any }[]) {
        // if(!jsonList) return null;
        return jsonList?.map(Organisation.fromJson);
    }
}

export type OrganisationStats = {
    datasetsCount: number;
    favoritesCount: number;
    viewCount: number;
    downloadCount: number;
};
export default Organisation;

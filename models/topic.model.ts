import { DateTime } from "luxon";

class Topic {
    constructor({
        id,
        title,
        imgUrl,
        description,
        dataQuality,
        isFavourited,
        lastUpdate,
        stats,
        url,
        topic_image,
        uuid
    }: TopicDetail) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.stats = stats;
        this.dataQuality = dataQuality;
        this.isFavourited = isFavourited;
        this.lastUpdate = lastUpdate;
        this.url = url;
        this.topic_image = topic_image;
        this.uuid = uuid;
    }
    id: number;
    title: string;
    imgUrl: string;
    description: string;
    dataQuality: number;
    isFavourited: boolean;
    lastUpdate: DateTime;
    stats: DataStats;
    url: string;
    topic_image: string;
    uuid: string;

    static fromJson(json: { [key: string]: any }) {
        // console.log({json});

        return new Topic({
            id: json["id"],
            uuid: "af06e024-f6d7-51ca-a18a-805003ca393d",
            imgUrl: json["logo_url"] || "",
            title: json["title"],
            description: json["description"] || "No description Present",
            dataQuality: json["data_quality"],
            isFavourited: json["is_favourited"],
            lastUpdate: json["last_updated"],
            url: json["url"],
            stats: {
                datasetsCount: json["dataset_count"],
                favoritesCount: json["favourite_count"],
                viewCount: json["view_count"],
                downloadCount: json["download_count"],
                mostRecentlyDownloaded: json["most_recently_downloaded"]
            },
            topic_image: json["topic_image"],
        });
    }

    static fromJsonList(jsonList: { [key: string]: any }[]) {
        return jsonList?.map(Topic.fromJson);
    }
}

export type TopicDetail = {
    id: number;
    uuid: string;
    title: string;
    imgUrl: string;
    description: string;
    dataQuality: number;
    lastUpdate: DateTime;
    isFavourited: boolean;
    stats: DataStats;
    url: string;
    topic_image: string;

};

export type DataStats = {
    datasetsCount: number;
    favoritesCount: number;
    viewCount: number;
    downloadCount: number;
    mostRecentlyDownloaded: string;
};

export default Topic;

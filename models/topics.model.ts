import { DateTime } from "luxon";
class Topic {
    title: string;
    id: number;
    description: string | null;
    imgUrl: string;
    isFavourited: boolean;
    imageCredit: string | null;
    dataQuality: string | null;
    lastUpdated: string | null;
    mostRecentlyDownloaded: string | null;
    stats: DataStats;

    constructor({
        title,
        id,
        description,
        imgUrl,
        isFavourited,
        imageCredit,
        dataQuality,
        lastUpdated,
        stats,
        mostRecentlyDownloaded,
    }: TopicDetail) {
        this.title = title;
        this.id = id;
        this.description = description;
        this.imgUrl = imgUrl;
        this.isFavourited = isFavourited;
        this.imageCredit = imageCredit;
        this.dataQuality = dataQuality;
        this.lastUpdated = lastUpdated;
        this.stats = stats;
        this.mostRecentlyDownloaded = mostRecentlyDownloaded;
    }

    static fromJson(json: any) {
        return new Topic({
            title: json.title,
            id: json.id,
            description: json.description,
            imgUrl: json.logo_url,
            isFavourited: json.is_favourited,
            imageCredit: json.image_credit,
            dataQuality: json.data_quality,
            lastUpdated: json.last_updated,
            stats: {
                datasetsCount: json["dataset_count"],
                favoritesCount: json["favorites_count"],
                viewCount: json["view_count"],
                downloadCount: json["download_count"],
            },
            mostRecentlyDownloaded: json.most_recently_downloaded,
        });
    }

    static fromJsonList(jsonList: any[]) {
        return jsonList.map((json) => Topic.fromJson(json));
    }
}

export type TopicDetail = {
    title: string;
    id: number;
    description: string | null;
    imgUrl: string;
    isFavourited: boolean;
    imageCredit: string | null;
    dataQuality: string | null;
    lastUpdated: string | null;
    mostRecentlyDownloaded: string | null;
    stats: DataStats;
};
export type DataStats = {
    datasetsCount: number;
    favoritesCount: number;
    viewCount: number;
    downloadCount: number;
};
export default Topic;

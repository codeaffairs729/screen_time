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
    }: {
        id: number;
        title: string;
        description: string;
        dataQuality: number;
        buttonTags: [];
        domains: [];
        topics: [];
        stats: {};
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dataQuality = dataQuality;
        this.buttonTags = buttonTags;
        this.domains = domains;
        this.topics = topics;
        this.stats = stats;
    }
    id: number;
    title: string;
    description: string;
    dataQuality: number;
    buttonTags: [];
    domains: [];
    topics: [];
    stats: {};

    static fromJson(json: { [key: string]: any }) {
        // console.log("......................Hits......................");
        // console.log(json, "Json hits");
        // console.log("......................End......................");
        const {
            id,
            title,
            description,
            dataQuality,
            buttonTags,
            domains,
            topics,
            stats,
        } = json || {};
        return new Organisation({
            id: Number(id),
            title: title,
            description: description,
            dataQuality: dataQuality,
            buttonTags: buttonTags,
            domains: domains,
            topics: topics,
            stats: stats,
        });
    }

    static fromJsonList(jsonList: { [key: string]: any }[]) {
        // if(!jsonList) return null;
        return jsonList?.map(Organisation.fromJson);
    }
}

export default Organisation;

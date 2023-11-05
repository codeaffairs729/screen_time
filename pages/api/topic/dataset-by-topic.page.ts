import Http from "common/http";

export default async function datasetByTopic(req: any, res: any) {
    try {
        const { topic_id, pageNumber, page_size, sort_by } = req.query;
        const response = await Http.get(
            `/v5/datasets/by-topic/${topic_id}/sorted-by/${sort_by}?page_number=${pageNumber}&page_size=${page_size}`,
            {
                baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_ROOT,
                extraHeaders: {
                    "Content-type": "application/json",
                    "x-api-key": process.env.NEXT_PUBLIC_MARK_KEY,
                },
            }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

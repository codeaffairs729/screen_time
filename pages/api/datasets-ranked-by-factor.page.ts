import Http from "common/http";

export default async function rankedByFactors(req: any, res: any) {
    try {
        const { orgUUid, key, pageNumber, orgDatasetsCount } = req.query;
        const response = await Http.get(
            `/v5/datasets/by-data-host/${orgUUid}/sorted-by/${key}?page_number=${pageNumber}&page_size=${orgDatasetsCount}`,
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

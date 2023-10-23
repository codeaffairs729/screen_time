import Http from "common/http";

export default async function datasetsByDataHost(req: any, res: any) {
    try {
        const { orgUUID, pageNumber, orgDatasetsCount } = req.query;
        console.log(orgUUID, pageNumber, orgDatasetsCount);
        const response = await Http.get(
            `/v5/datasets/by-data-host/${orgUUID}?page_number=${pageNumber}&page_size=${orgDatasetsCount}`,
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

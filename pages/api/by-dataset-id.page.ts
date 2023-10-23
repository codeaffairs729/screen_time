import Http from "common/http";

export default async function byDatasetId(req: any, res: any) {
    try {
        const { item_req_param } = req.query;
        const response = await Http.get(
            `/v5/datasets/by-dataset-ids?${item_req_param}`,
            {
                baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_V5_ROOT,
                redirectToLoginPageIfAuthRequired: false,
            }
        )
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

import Http from "common/http";

export default async function datasets(req: any, res: any) {
    try {
        const queryString = Object.entries(req.query)
            .map(([key, value]) => {
                return `${key}=${value}`;
            })
            .join("&");
        const response = await Http.get(`/v5/datasets?${queryString}`, {
            baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_ROOT,
            extraHeaders: {
                "Content-type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_MARK_KEY,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

import Http from "common/http";

export default async function relatedByDescription(req: any, res: any) {
    const LINKEDIN_CLIENT_SECRET =
        process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET_ID || "";
    const LINKEDIN_CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || "";

    try {
        const { code,redirect_uri } = req.query;
        const data = await fetch(
            "https://www.linkedin.com/oauth/v2/accessToken",
            {
                method: "POST",
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: redirect_uri,
                    client_id: LINKEDIN_CLIENT_ID,
                    client_secret: LINKEDIN_CLIENT_SECRET,
                }),
            }
        ).then((response) => response.json());
        const accessToken = data.access_token;

        res.status(200).json({ accessToken: accessToken });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

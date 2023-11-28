
export default async function linkedinLogin(req: any, res: any) {
    const LINKEDIN_CLIENT_ID = "7785p7da8wq52x";
    const LINKEDIN_CLIENT_SECRET ="ktXRwbugXXz4GqHh";

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
                    client_id: "7785p7da8wq52x",
                    client_secret: "ktXRwbugXXz4GqHh",
                }),
            }
        ).then((response) => response.json());
        const accessToken = data.access_token;

        res.status(200).json({ accessToken: accessToken });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

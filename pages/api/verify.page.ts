
export default async function verifyToken(req:any, res:any) {
    const requestMethod = req.method;
    const url = "https://www.google.com/recaptcha/api/siteverify";
    const secretKey = "6Lcp2BknAAAAAOWe7aCVK-oFo27MCl8fgb4iDKE8";
    switch (requestMethod) {
        case "POST":
            try {
                const response = await fetch(
                    `${url}?secret=${secretKey}&response=${req.body}`,
                    {
                        method: "POST",
                    }
                );
              const data = await response.json();
              if (data?.success) {
                  res.status(200).json({ message: "human" });
              } else {
                  res.status(200).json({ message: "robot" });
              }
             
            } catch (error) {
               res.status(500).json({
                   message: `error`,
               });
            }
    }
}

import got from "got/dist/source";

export const fetchIdToken = async function (aud: string): Promise<string> {
    const metadataServerTokenURL = `http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=${aud}`;

    let resp;
    try {
        resp = await got(metadataServerTokenURL, {
            headers: {
                "Metadata-Flavor": "Google"
            }
        });
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch ID token from Google metadata endpoint");
    }

    const token = resp.body;
    if (!token) {
        throw new Error("ID token from Google metadata endpoint is empty");
    }

    return token;
};

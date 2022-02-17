export const isValidDBReq = (
    req,
    dwcApiKey = process.env.DWC_API_KEY
) => {
    return req?.headers?.apikey === dwcApiKey || req?.query?.apikey === dwcApiKey;
};
export interface LogReqBody {
    statusCode?: string,
    originalPath?: string,
    referrer?: string,
    userAgent?: string,
    ip?: string,
    acceptLanguage?: string,
    domain?: string,
    correlationId?: string,
    timestamp?: number,
    redirectUrl?: string,
}

export interface IPInfo {
    version: string,
    city: string,
    region: string,
    countryName: string,
    countryCode: string,
    postal: string,
    latitude: number,
    longitude: number,
    timezone: string,
    asn: string,
    org: string,
}
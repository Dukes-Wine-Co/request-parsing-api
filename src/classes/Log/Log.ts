import UserAgent from '../UserAgent';
import CustomDate from '../CustomDate';
import { IPInfo, LogReqBody } from './Log.types';
import axios from 'axios';

export class Log {
    request: LogReqBody;

    constructor(log: string){
        this.request = JSON.parse(log);
    }

    private isLocalRequest(): boolean {
        return this.request.domain.includes('localhost');
    }

    private static processUserAgent(uaString: string): UserAgent.AsObject {
        return new UserAgent(uaString).toObject();
    }

    private static hasApiKeyDefined(): boolean {
        return process.env?.IP_API_KEY.length > 0;
    }

    private getDateInfo(): CustomDate.AsObject {
        const { timestamp } = this.request;
        return new CustomDate(timestamp).toObject();
    }

    async getLocationData(): Promise<IPInfo | {}> {
        if (this.isLocalRequest()){
            return Promise.resolve({});
        }

        const baseApiRoute = `https://ipapi.co/${this.request.ip}/json`;

        const requestLocation = Log.hasApiKeyDefined()
            ? `${baseApiRoute}/?key=${process.env.IP_API_KEY}`
            : baseApiRoute;

        try {
            const { data } = await axios.get(requestLocation);

            return {
                version: data.version,
                city: data.city,
                region: data.region,
                countryName: data.country_name,
                countryCode: data.country_code,
                postal: data.postal,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone,
                asn: data.asn,
                org: data.org
            };

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`axios.isAxiosError(): ${error}`);
                return {};
            } else {
                console.error(`axios.get(): ${error}`);
                return {};
            }
        }
    }

    private static formatRequest(inputReq: LogReqBody): LogReqBody {
        const { ip, ...rest } = inputReq;

        const [ firstIp ] = ip.split(',');

        return {
            ip: firstIp,
            ...rest
        };
    }

    private async processLog(): Promise<Log.AsObject> {
        const locationData = await this.getLocationData();
        const userAgentInfo = Log.processUserAgent(this.request.userAgent);
        const dateInfo = this.getDateInfo();

        return {
            request: Log.formatRequest(this.request),
            location: locationData,
            userAgentInfo: userAgentInfo,
            dateInfo: dateInfo
        };
    }

    async toObject(): Promise<Log.AsObject> {
        return this.processLog();
    }
}

export namespace Log {
    export interface AsObject{
        request: LogReqBody;
        location: IPInfo | {};
        userAgentInfo: UserAgent.AsObject;
        dateInfo: CustomDate.AsObject;
    }
}
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

    private getDateInfo(): CustomDate.AsObject {
        const { timestamp } = this.request;
        return new CustomDate(timestamp).toObject();
    }

    async getLocationData(): Promise<IPInfo | {}> {
        if (this.isLocalRequest()){
            return Promise.resolve({});
        }

        const requestLocation = `https://ipapi.co/${this.request.ip}/json`;

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
                console.log(`There was an axios error making this request: ${error}`);
                return {};
            } else {
                console.log(`There was an error making this request: ${error}`);
                return {};
            }
        }
    }

    private async processLog(): Promise<Log.AsObject> {
        const locationData = await this.getLocationData();
        const userAgentInfo = Log.processUserAgent(this.request.userAgent);
        const dateInfo = this.getDateInfo();

        return {
            request: this.request,
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
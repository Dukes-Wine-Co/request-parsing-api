import UAParser from 'ua-parser-js';
import { capitalizeFirstLetter, clearEmptyObjFields } from '../../helpers';
import UserAgentType from './UserAgent.types';

export class UserAgent {
    ua: UAParser;

    private static flattenKeys = [
        'browser',
        'engine',
        'os',
        'device',
        'cpu'
    ];

    constructor(usString: string) {
        Object.assign(this, UAParser(usString));
    }

    private flatten(): UserAgentType {
        const finalObj = {
            userAgent: this.ua
        };

        UserAgent.flattenKeys.forEach(key => {
            const currObj = this[key];
            const objKeys = Object.keys(currObj);

            objKeys.forEach(innerKey => {
                const newKeyName = `${key}${capitalizeFirstLetter(innerKey)}`;
                finalObj[newKeyName] = currObj[innerKey];
            });
        });

        return clearEmptyObjFields(finalObj);
    }

    toObject():UserAgent.AsObject {
        return this.flatten();
    }
}

export namespace UserAgent {
    export type AsObject = {} & UserAgentType
}
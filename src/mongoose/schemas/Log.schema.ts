import { Schema, model } from 'mongoose';
import Log from '../../classes/Log';
import { configureMongoCollectionName } from '../../config/mongo-config';

const requestLog = new Schema<Log.AsObject>({
    request: {
        statusCode: {
            type: String,
            required: false
        },
        originalPath: {
            type: String,
            required: false
        },
        referrer: {
            type: String,
            required: false
        },
        userAgent: {
            type: String,
            required: false
        },
        ip: {
            type: String,
            required: false
        },
        acceptLanguage: {
            type: String,
            required: false
        },
        domain: {
            type: String,
            required: false
        },
        correlationId: {
            type: String,
            required: false
        },
        timestamp: {
            type: Number,
            required: false
        },
        redirectUrl: {
            type: String,
            required: false
        }
    },
    dateInfo: {
        seconds: {
            type: String,
            required: true
        },
        hour: {
            type: String,
            required: true
        },
        minutes: {
            type: String,
            required: true
        },
        timeString: {
            type: String,
            required: true
        },
        dayOfWeek: {
            type: String,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        dateString: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        }
    },
    location: {
        version: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        region: {
            type: String,
            required: false
        },
        countryName: {
            type: String,
            required: false
        },
        countryCode: {
            type: String,
            required: false
        },
        postal: {
            type: String,
            required: false
        },
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
        },
        timezone: {
            type: String,
            required: false
        },
        asn: {
            type: String,
            required: false
        },
        org: {
            type: String,
            required: false
        }
    },
    userAgentInfo: {
        browserName: {
            type: String,
            required: false
        },
        browserMajor: {
            type: String,
            required: false
        },
        browserVersion: {
            type: String,
            required: false
        },
        engineMajor: {
            type: String,
            required: false
        },
        engineName: {
            type: String,
            required: false
        },
        engineVersion: {
            type: String,
            required: false
        },
        osName: {
            type: String,
            required: false
        },
        osMajor: {
            type: String,
            required: false
        },
        osVersion: {
            type: String,
            required: false
        },
        deviceName: {
            type: String,
            required: false
        },
        deviceMajor: {
            type: String,
            required: false
        },
        deviceVersion: {
            type: String,
            required: false
        },
        cpuName: {
            type: String,
            required: false
        },
        cpuVersion: {
            type: String,
            required: false
        },
        cpuMajor: {
            type: String,
            required: false
        }
    }
});

export const RequestLogModel = model<Log.AsObject>(configureMongoCollectionName('RequestLog'), requestLog);
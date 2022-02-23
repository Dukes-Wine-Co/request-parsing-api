import Log from '../../classes/Log';
import { RequestLogModel } from '../../mongoose/schemas/Log.schema';
import {LogReqBody} from "../../classes/Log/Log.types";

export const preformatRequestLog = (incomingRequest: unknown): string => {
    return typeof incomingRequest === 'string' ? incomingRequest : JSON.stringify(incomingRequest);
};

export const processLog = async(incomingReq: string): Promise<Log.AsObject> => {
    return new Log(incomingReq).toObject();
};

export const getLogFromDb = async (log: unknown) => {
    const reqObject: LogReqBody = typeof log === 'string' ? JSON.parse(log) : log;

    return RequestLogModel.findOne({
        "request.timestamp": reqObject.timestamp
    });
}

export const saveLogInDB = async(processedReq: Log.AsObject) => {
    try {
        const logDoc = new RequestLogModel(processedReq);
        await logDoc.save();
        console.log('saveLogInDB(): saved req to db');
    } catch (e){
        return Promise.reject(`saveLogInDB(): Error saving log in DB: ${e.message}`);
    }
};

export const replaceLogInDB = async(processedReq: Log.AsObject) => {
    try {
        const logDoc = new RequestLogModel(processedReq);
        const { _id: firstDocId, ...safeDoc } = logDoc;
        // @ts-ignore
        const innerDoc = safeDoc._doc;
        const {_id, ...replacementDoc} = innerDoc


        console.log(replacementDoc);

        await RequestLogModel.replaceOne(
            {
                "request.timestamp": processedReq.request.timestamp
            },
            replacementDoc
        )
        console.log('replaceLogInDB(): req updated in db')
    } catch (e){
        return Promise.reject(`replaceLogInDB(): ${e.message}`);
    }
}
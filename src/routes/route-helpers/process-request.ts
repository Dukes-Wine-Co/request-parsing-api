import Log from "../../classes/Log";
import {RequestLogModel} from "../../mongoose/schemas/Log.schema";

export const preformatRequestLog = (incomingRequest: unknown): string => {
    return (typeof incomingRequest === 'string') ? incomingRequest : JSON.stringify(incomingRequest);
}

export const processLog = async (incomingReq: string): Promise<Log.AsObject> => {
    return new Log(incomingReq).toObject();
}

export const saveLogInDB = async (processedReq: Log.AsObject) => {
    try {
        const logDoc = new RequestLogModel(processedReq);
        await logDoc.save();
        console.log('saveLogInDB(): saved req to db')
    } catch (e){
        return Promise.reject(`Error saving log in DB: ${e.message}`)
    }
}
import express from "express";
import {preformatRequestLog, processLog, saveLogInDB} from "./route-helpers/process-request";
import {isValidDBReq} from "./route-helpers/request-helpers";

const apiRoutes = app => {
    const router = express.Router();

    app.use('/api', router);

    router.use('/', (req, res, next) => {
        if (isValidDBReq(req)) {
            return next();
        }

        const apiMsg = 'You are not authorized to view this route.';

        res.status(403).send({
            message: apiMsg,
        });
    });

    router.post('/process', async (req, res) => {
        const { request } = req.body;

        try {
            const processedLog = await processLog(preformatRequestLog(request));
            await saveLogInDB(processedLog);

            res.send({
                message: "req saved to db"
            });
        } catch (e){
            res
            .status(500)
            .send({
                message: 'there was an error processing this request',
                error: e
            })
        }

    })
}

export default apiRoutes;
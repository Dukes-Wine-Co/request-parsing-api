import express from 'express';
import {
    getLogFromDb,
    preformatRequestLog,
    processLog, replaceLogInDB,
    saveLogInDB
} from './route-helpers/process-request';
import { isValidDBReq } from './route-helpers/request-helpers';

const apiRoutes = app => {
    const router = express.Router();

    app.use('/api', router);

    router.use('/', (req, res, next) => {
        if (isValidDBReq(req)) {
            return next();
        }

        const apiMsg = 'You are not authorized to view this route.';

        res.status(403).send({
            message: apiMsg
        });
    });

    router.post('/process', async(req, res) => {
        const { request } = req.body;

        try {
            const logInDb = await getLogFromDb(request);

            if (logInDb){
                res.send({
                    message: 'log exists in db already'
                });
                return;
            }

            const processedLog = await processLog(preformatRequestLog(request));
            await saveLogInDB(processedLog);

            res.send({
                message: 'req saved to db'
            });
        } catch (e){
            console.error('router.post(/api/process): ', e);

            res
            .status(500)
            .send({
                message: 'there was an error processing this request',
                error: e?.message
            });
        }
    });

    router.post('/enrich', async(req, res) => {
        const { request } = req.body;

        try {
            const logInDb = await getLogFromDb(request);

            if (!logInDb){
                res
                .status(500)
                .send({
                    message: 'log does not exist'
                });
                return;
            }

            const { request: originalReqInfo } = logInDb;
            const updatedLog = await processLog(preformatRequestLog(originalReqInfo));
            await replaceLogInDB(updatedLog);

            res.send({
                message: 'req enriched in db'
            });
        } catch (e){
            console.error('router.post(/api/enrich): ', e);

            res
                .status(500)
                .send({
                    message: 'there was an error processing this request',
                    error: e?.message
                });
        }
    });
};

export default apiRoutes;
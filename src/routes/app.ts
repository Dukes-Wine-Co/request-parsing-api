import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from "./api-routes";

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

apiRoutes(app);

export default app;
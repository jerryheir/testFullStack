import express, { Application } from "express";
import morgan from "morgan";
import downloads from "./routes/downloads.routes";

const app: Application = express();
const API_VERSION = "/api/v1"; // should be handle better in a proper project

app.use(express.json());
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(`${API_VERSION}/downloads`, downloads);

export default app;
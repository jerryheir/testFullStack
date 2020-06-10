import { Router } from "express";
import { getDownloads, addDownloads, deleteDownloads, updateDownloads } from "../controllers/downloads.controllers";

const router = Router();

const routes = router
                .get('/', getDownloads)
                .post('/', addDownloads)
                .put('/', updateDownloads)
                .delete('/:id', deleteDownloads);

export default routes;
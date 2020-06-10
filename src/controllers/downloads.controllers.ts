import { Request, Response } from "express";
import Services from "../services";
import q from "../services/queue";

export const getDownloads = async (req: Request, res: Response) => {
    try {
        const result = await Services.getDownloads();
        return res.status(200).json({
            items: result
        })
    } catch(err) {
        return Services.errorCheck(err, res);
    }
}

export const addDownloads = async (req: Request, res: Response) => {
    try {
        const downloads = await Services.addDownloads(req);
        if (!downloads || !downloads._id) return res.status(500);
        q.push({ id: downloads._id, url: req.body.url });
        return res.status(201).json({
            staticId: downloads._id,
            createdAt: downloads.createdAt
        })
    } catch(err){
        return Services.errorCheck(err, res);
    }
}

export const updateDownloads = async (req: Request, res: Response) => {
    try {
        await Services.updateDownloads(req);
        return res.status(200).json({
            success: true,
            message: "Updated successfully"
        })
    } catch(err){
        return Services.errorCheck(err, res);
    }
}

export const deleteDownloads = async (req: Request, res: Response) => {
    try {
        await Services.deleteDownloads(req);
        return res.status(200).json({
            success: true,
            message: "Removed successfully"
        })
    } catch(err){
        return Services.errorCheck(err, res);
    }
}
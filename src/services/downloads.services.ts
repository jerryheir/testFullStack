import { Request, Response } from "express";

const getDownloads = (Downloads: any) => async () => {
    try {
        const downloads =  await Downloads.find();
        if (!downloads || downloads.length === 0) return [];
        const array = downloads.map((item: any, key: number)=>{ 
            return { 
                id: item._id, 
                url: item.url, 
                status: item.status,
                createdAt: item.createdAt
            } 
        })
        return array;
    } catch (err){
        console.log(err);
    }
}

const addDownloads = (Downloads: any) => async (req: Request) => {
    try {
        const { url } = req.body;
        if (!url) return {};
        const downloads: any = await Downloads.create({ url, status: "pending" });
        return downloads;
    } catch (err){
        console.log(err)
    }
}

const updateDownloads = (Downloads: any) => async (req: Request) => {
    try {
        const { id, status } = req.body;
        await Downloads.findByIdAndUpdate({ _id: id }, { status });
    } catch (err){
        console.log(err)
    }
}

const deleteDownloads = (Downloads: any) => async (req: Request) => {
    await Downloads.findByIdAndRemove(req.params.id);
}

const errorCheck = () => (err: any, res: Response) => {
    console.log(err)
    if (err.name === "ValidationError"){
        const messages = Object.values(err.errors).map((val: any)=>val.message);
        return res.status(400).json({
            success: false,
            error: messages
        });
    }
    return res.status(500).json({
        success: false,
        error: "SERVER ERROR"
    });
}


export default (Downloads: any) => {
    return {
        getDownloads: getDownloads(Downloads),
        addDownloads: addDownloads(Downloads),
        updateDownloads: updateDownloads(Downloads),
        deleteDownloads: deleteDownloads(Downloads),
        errorCheck: errorCheck()
    }
}
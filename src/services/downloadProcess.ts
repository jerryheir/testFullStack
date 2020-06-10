import Downloads from "../models/Downloads";

export default async (id: string, url: string) => {
    try {
        if ((url.substring(0, 4).toLowerCase() === 'http')){
            const globalAny: any = global;
            const result: any = await Downloads.findByIdAndUpdate({ _id: id }, { status: 'in-progress', createdAt: Date.now() });
            if (globalAny.io) globalAny.io.emit('progress', { id, createdAt: result.createdAt });
            const promise : Promise<boolean> = new Promise(function(resolve, reject){
                setTimeout(async ()=>{
                    const done: any = await Downloads.findByIdAndUpdate({ _id: id }, { status: 'done', createdAt: Date.now() });
                    if (globalAny.io) globalAny.io.emit('done', { id, createdAt: done.createdAt }); 
                    // I used the if statement because of the test (app.test.ts)
                    resolve(true);
                }, 10000);
            })
            return promise;
        } else {
            // I could set status to failed here
            return false;
        }
    } catch (err){
        console.log(id, err);
        return false;
    }
}
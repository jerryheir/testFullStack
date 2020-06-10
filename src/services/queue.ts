import async from 'async';
import downloadProcess from "./downloadProcess";

const q = async.queue(async (task: any, callback: any) => {
    const { id, url } = task;
    const result = await downloadProcess(id, url);
    if (result){
        await callback();
    } else {
        // retry logic
        await downloadProcess(id, 'http://'+url);
        await callback();
    }
}, 1);

export default q;
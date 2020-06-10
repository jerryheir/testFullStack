import dotenv from "dotenv";
// import { CronJob } from "cron";
import http from "http";
dotenv.config({ path: './config/config.env' });
import connectDB from "../config/db";
import app from "./app";
// import Downloads from "./models/Downloads";
// import downloadProcess from "./downloadProcess";

connectDB();

const globalAny: any = global;
const PORT = process.env.PORT || 5000;

// const CRON_TIME = '*/15 * * * * *';

/*new CronJob(CRON_TIME, async () => {
    const queue = await Downloads.find({ 'status': 'pending' });
    if (queue.length > 0){
        await downloadProcess(queue[0]._id);
    } else {
        const retry = await Downloads.find({ 'status': 'in-progress' });
        if (retry.length > 0) await downloadProcess(retry[0]._id);
    }
}, null, true, 'America/Los_Angeles');*/
const server = http.createServer(app);
const io = require('socket.io')(server, { origins: '*:*' });
globalAny.io = io;

server.listen(PORT, ()=>console.log(`Server running in ${process.env.NODE_ENV}`));

io.on('connection', (socket: any) => {
    socket.emit('connected', { message: 'connected' });
});
  
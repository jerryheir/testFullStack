# --- Test --- 

# Requirements:
* node (npm and yarn) v2.0 and higher
* git
    * For more information on this, check the documentation on [Git Version Control](https://git-scm.com/docs "Git")

# SET UP INSTRUCTIONS 
## STEP 1: 
Run a git clone to with this command ```git clone https://github.com/jerryheir/testFullStack.git``` on your terminal

## STEP 2:
```cd testFullStack```

## STEP 3 (RUN APPLICATION): 
### Using docker-compose
- Ensure that proxy in the ```client/package.json``` is set to "http://backend:5000" on line 40

- If you are using docker-compose and you have it installed, run ```docker-compose up``` or ```docker-compose up --build``` in the terminal in the root folder

- A url will be appear at the end of the process, possibly ```http://localhost:3000``` . Open that in a browser tab.

(May take a while for the first time)

### NOTE: 
if you are not using docker-compose and you want to run application and tests etc. Use the following steps:
(You must have at least node installed, and npm or yarn)
- run this command ```yarn install && cd client && yarn install && cd ..``` in the root folder on your terminal

- Go into ```client/package.json``` and change proxy to "http://localhost:5000" on line 40

- when that is done, go back to the root directory, run ```yarn dev``` to launch application in development server

- To run a test, end the current process using Control + C (MAC) and Command + C (Windows)... Then run the following in the command line ```yarn test``` or ```npm run test```

# Understanding the Project Structure
## NODE APPLICATION
In structure and architecture, I implemented a similar but advanced MVC pattern (Model View Controllers), I tried to isolate most functionalities, not only because of easy readability but also to help in writing unit and integration tests. Environmental Variables were saved in the root directory in a config folder. I used mongodb cloud as my database (I intentionally did not try to create a docker container for mongo for ease of use). sinon for mock test, async/queue npm package for queuing, socket.io for realtime integrations etc.

IMPORTANT TO NOTE THAT; In the response format, I tried to follow the exact format given to me in the instructions for the POST and GET endpoints ... though I used a ```{ success: boolean, data: Array<any>, message: string } ``` for the update and delete endpoints not given to me. I added these other endpoints because of testing, and sometimes the list gets too long.

IMPORTANT TO NOTE THAT; Since I was told to create an application with a potential to scale, I had to add API versioning, and so the application endpoints where done directed to ```/api/v1/downloads```

## REACT APPLICATION
I implemented a system called "Atoms Structure", where reusable components are treated as atoms (which are the smallest particle of an entity that can exist), they are done as functional components for performance and ease of use since they are mostly presentational in nature
To show my knowledge in modern react.js, I used redux for global state management, react hooks for every single component (useState, useRef, useEffect, useStore, useDispatch, useSelector etc.), I also took it a step further to use react-native-web for easy styling, socket.io-client for real-time integrations. All done in typescript. And also the UI in my opinion is not so bad ; )

### UNDERSTANDING THE QUEUING NON-BLOCKING SERVICE
NPM package used is [Queue](https://caolan.github.io/async/v3/docs.html#queue "Queue");

Usage:
```
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
```
- I created a queue called "q", it takes a task carrying the id and url that needs to be downloaded. This does not delay the response
- The download process was created as a separate service that delays for 10 secs in "downloadProcess" function.
- Concurrency is set to one, meaning that only when the "callBack" function is called, can the next task commence.

### THE DOWNLOAD PROCESS
```
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
```
- I tried to simulate a failure, so I can test the simple simulated retry logic. I do this by checking if the string starts with http, then it fails, we add http to the string and retry the process.(Just a simulation)
- We then resolve the setTimeout process after the status is set to done and we return true to the queue manager
- The callBack is fired, and the next task is started.

# CHECKLIST (NODE APPLICATION)
- ### Be able to create a new download with POST /downloads
This is done

- ### Be able to get all downloads and their correct statuses with GET /downloads
This is done

- ### Be able to receive a response as soon as a download job is created, without waiting for the download to complete
This is done, I used a queuing system, async/queue even though there are other alternatives like RabbitMQ and Bull

NOTE: This is not the only way to create a non blocking service ... A cron job can also be used to do that, and in the server.js, I implemented a cron that was commented out. This was just to show my little experience in solving problems relating to non blocking systems.

- ### Be able to handle failed downloads by retrying the download where appropriate
This is done. And can be seen in the downloadProcess.ts file

- ### Be able to run unit or integration tests with npm run test
This is done.


# CHECKLIST (NODE APPLICATION)
- ### Be able to see a list of current downloads with status (pending / in progress / done)
This is done. Though in a real life scenario, I think a "failed" status and number of retry limit will be a good idea.

- ### Be able to see on each download, the URL of the download and the timestamp of its last status update
This is done.

- ### Be able to add a download to the queue by entering the download link in the textbox and clicking "GO"
This is done.

- ### Be able to see the downloads change their status without refreshing the page 
This is done easily using socket.io

# OTHER POINTS
- ### I wrote tests for the node application
Using jest, sinon and supertest

- ### Use a type checker - Typescript 
Static Typing throughout project

- ### Wrote a README ; )

# FINAL NOTES (THOUGHTS AND CONSIDERATIONS)
I loved the challenge which shows me the great individuals that set up this test.
Thank you for the opportunity. I hope to hear from you soon
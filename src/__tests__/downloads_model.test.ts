import dotenv from "dotenv";
dotenv.config({ path: './config/config.env' });
import * as mongoose from "mongoose";
import connectDB from "../../config/db";
import Downloads from "../models/Downloads";

connectDB();

const URL= "https://stears-interview-data.s3-eu-west-1.amazonaws.com/logo.png";

describe('Downloads model test', ()=>{
    beforeAll(async ()=>{
        await Downloads.remove({});
    });

    afterEach(async ()=>{
        await Downloads.remove({});
    });

    afterAll(async ()=>{
        await mongoose.connection.close();
    });

    it('has a module', ()=>{
        expect(Downloads).toBeDefined();
    }, 30000);

    describe('get downloads', ()=>{
        it('gets downloads', async ()=>{
            const downloads = new Downloads({ 
                url: URL,
                status: 'pending'
            });
            const result = await downloads.save();
            if (result){
                const findOne: any = await Downloads.findOne({ 
                    url: URL 
                });
                const expected = URL;
                const actual = findOne.url;
                expect(actual).toEqual(expected);
            }
        }, 30000)
    })

    describe('add downloads', ()=>{
        it('adds a download', async ()=>{
            const downloads = new Downloads({ 
                url: URL,
                status: 'pending'
            });
            const addedDownload: any = await downloads.save();
            if (addedDownload){
                const expected = URL;
                const actual = addedDownload.url;
                expect(actual).toEqual(expected);
            }
        }, 30000)
    })

    describe('update downloads', ()=>{
        it('updates a download', async ()=>{
            const downloads: any = new Downloads({ 
                url: URL,
                status: 'pending'
            });
            const result = await downloads.save();
            if (result){
                downloads.url = URL;
                const updatedDownload: any = await downloads.save();
                const expected = URL;
                const actual = updatedDownload.url;
                expect(actual).toEqual(expected);
            }
        }, 30000)
    })
})
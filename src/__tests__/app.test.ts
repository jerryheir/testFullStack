import dotenv from "dotenv";
dotenv.config({ path: './config/config.env' });
const request = require('supertest');
import * as mongoose from "mongoose";
import connectDB from "../../config/db";
import app from "../app";

connectDB();

const API_VERSION = "/api/v1";

describe('App test', ()=>{
    it('has a module', ()=>{
        expect(app).toBeDefined();
    })
    let server: any;
    beforeAll(()=>{
        server = app.listen(5000);
    })
    afterAll((done)=>{
        mongoose.connection.close();
        server.close(done);
    });
    describe('downloads routes test', ()=>{
        it('can show all downloads', async ()=>{
            await request(server).get(`${API_VERSION}/downloads`).expect(200);
        }, 10000)
        it('adds a download', async ()=>{
            await request(server).post(`${API_VERSION}/downloads`)
            .send({ 
                url: "https://stears-interview-data.s3-eu-west-1.amazonaws.com/logo.png" 
            })
            .set('Accept', 'application/json')
            .expect(201);
        })
    })
    describe('404 test', ()=>{
        it('wrong endpoint', async ()=>{
            await request(server).post(`${API_VERSION}/fail`).expect(404);
        })
        it('wrong url', async ()=>{
            await request(server).post(`/fail`).expect(404);
        })
        it('wrong version number', async ()=>{
            await request(server).post(`/downloads`).expect(404);
        })
    })
})
import express, { Application } from "express";
import env from "dotenv";
import { db } from "./utils/db";
import { mainApp } from "./mainApp";
env.config();

const app: Application = express();
const port : number = parseInt(process.env.PORT!);

mainApp(app)
const server = app.listen(process.env.PORT || port, () => {
    console.log(); 
    db()
});

process.on("uncaughtException", (error: Error) => {
    console.log("uncaughtException");
    console.log("uncaughtExpection: ", error);

    process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection");
    console.log("unhandledRejection:", reason);

    server.close(() => {
        process.exit(1)
    })
    
    
})
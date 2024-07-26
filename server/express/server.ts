import express, {Express, Request, Response} from "express";
import path from "path";
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();

const app:Express = express();
const port = process.env.PORT || 8000;
const stripe =require("stripe")(process.env.STRIPE_SECRET);

app.use(express.json());
app.use(cors())

interface RequestBody{
    amout: number
}


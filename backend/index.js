import express,{json} from "express"
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./Config/database.js"
import corsOption from "./Utils/CorsOption.js"
import router from "./routes/route.js"
import startServer from "./Req/Getreq/startServer.js"
import bodyParser from "body-parser"


connectDB();

dotenv.config({
    path:'.env'
})

const PORT = process.env.PORT;
const app = express();


app.use(json());
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api",router)


mongoose.connection.once('open', ()=>{
    console.log('connected to mongoDB Please wait Starting Server..')
    startServer(app,PORT);
})
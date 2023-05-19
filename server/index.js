import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";

// Configuration and middlewares
const __filename = fileURLToPath(import.meta.url); //is used to obtain the file path of the current module in Node.js.
const __dirname = path.dirname(__filename);
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common")) 
app.use(bodyParser.json({limit:"30mb",extended : true  }));
app.use(bodyParser.urlencoded({limit:"30mb",extended : true  }))
app.use(cors())
app.use("/assets" , express.static(path.join(__dirname , 'public/assets')))
import {register} from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js";

//File Storage and upload 
const storage =  multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , "public/assets");
    },
    filename: function(req , file ,cb) {
        cb(null, file.originalname);
    },
})
const upload = multer({storage});

// ROUTES WITH FILES
app.post("/auth/resgister" , upload.single("picture"),verifyToken , register) 
 // It shoudld be like this in the full version 
//app.post("/auth/resgister" , upload.single("picture"),verifyToken , register)
//I am just not adding it because it is not complete.
app.post("/posts" , verifyToken , upload.single("picture"), createPost) 
//This is the picture property that will pick the 
//picture up and save it in local storage.This is where the picture is located in the HTTTP call.
//You can set it whatever you want just make sure it alligns with the same property in the frontend.


// ROUTES
app.use("/auth" ,authRoutes );
app.use("/users" , userRoutes);
app.use("/posts" , postRoutes);

//Mongoose Setup
const PORT  = process.env.PORT || 6001 ; 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology  : true,
}).then(() => {
    app.listen(PORT , () => console.log("SERVER RUNNING on port: " +PORT));
}).catch((err) => console.log(err + "Erorr did not conncet to server"))

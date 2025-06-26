//API DOCUMENTATION
import express from "express";
import swaggerUi from 'swagger-ui-express'

// package import
import swaggerDoc from 'swagger-jsdoc'
import dotenv from "dotenv";
import colors from "colors";
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-error';

//security package

//files imports
import connectDB from "./config/db.js";
//routes import
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from "./middlewares/errorMiddleware.js";
import jobsRoutes from "./routes/jobsRoutes.js"
import userRoutes from './routes/userRoutes.js'
import { title } from "framer-motion/client";

//Dot ENV config
dotenv.config();

//mongodb connection
connectDB();

//Swagger api config
//swagger api options
const options ={
  definition:{
  openapi:"3.0.0",
  info:{
    title:'Job Portal Application',
    description:'Node Expressjs Job Portal Application'
  },
  servers:[
    {
    url:"http://localhost:8080"
    }
  ]
  },
  apis:["./routes/*.js"],
  
};

const spec = swaggerDoc(options)


//rest object
const app = express();

//MIDDLEWARE


app.use(express.json());
app.use(cors())
app.use(morgan("dev"))


//routes
// app.get("/", (req, res) => {
//   res.send("<h1> Welcome To job portal </h1>");
// });
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job',jobsRoutes);

//homeroutes root
app.use("/api-doc", swaggerUi.serve,swaggerUi.setup(spec));


//validation middleware
app.use(errorMiddleware);


//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  // console.log(
  //   `Node Server Running In ${process.env.DEV_MODE} Mode on port on ${PORT}`.bgCyan.white
  // );
});

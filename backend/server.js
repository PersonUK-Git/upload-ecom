import express from "express";
import colors from "colors";  
import morgan from "morgan";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
//config env
dotenv.config();

//database config
connectDB();
const app =  express()

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routes 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

//rest api

app.get('/', (req, res) => {
    res.send("<h1> Welcome to ecom app </h1>")
})

//port

const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})
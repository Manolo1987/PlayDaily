import express from 'express'
import cors from 'cors'
import connectDB from './config/dbConnect.js'

const PORT = process.env.VITE_PORT || 3000;

const app = express();

app.use(cors)
app.use(express.json());

connectDB();


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
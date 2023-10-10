import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js'
import authRoute from './routes/auth.js'

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);

// Response handling
app.use((obj,req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong";

    return res.status(statusCode).json({
        success: [200,201,204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data,
        stack: obj.stack
    });
});

//DB Connection
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connection Success');
    }
    catch (error){
        throw error;
    }
}




// app.use('/api/login', (req,res) => {
//     return res.send('Login is Successful');
// })

// app.use('/api/registration', (req,res) => {
//     return res.send('Registration is Successful');
// })

// app.use('/', (req,res) => {
//     return res.send('Welcome to MEAN!!!!');
// });

app.listen(8000, () => {
    connectMongo();
    console.log('Backend Connected');
});


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

//app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:4200'
//   }));
let whitelist = ['http://localhost:4200', 'http://localhost:80'];
let corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || origin == undefined) {
            callback(null, true)
        } else {
            console.log(origin)
            callback(new Error('Not allowed by CORS'))
        }
    }, credentials: true
}

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());


app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


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


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

// Config env
dotenv.config({ path: process.cwd() + './config/.env' });

// Database connection
connectDB();

//Body Parser
app.use(express.json());

app.use(cors());

//Http request log
app.use(morgan("dev"));

// Router files
const userRouter = require('./routes/user');
const resourceRouter = require('./routes/resource');

// Mount routers
app.use('/api/user',userRouter);
app.use('/api/resource',resourceRouter);



const errorHandler = require('./middleware/error');
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, console.log(
    `Server is running in on port ${PORT}`
));



//Handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server and exit process
    server.close(() => process.exit(1));
});
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const paymentRoutes = require("./routes/payment.routes");


connectToDb();

// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));
// app.options("*", cors());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Handle preflight requests
    }

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/", (req, res) => {
    res.send("Hello from Backend");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/api/payment', paymentRoutes)

module.exports = app;

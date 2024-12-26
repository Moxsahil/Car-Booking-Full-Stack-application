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

app.use(cors(
    {
        origin: "https://car-booking-rs6p.onrender.com",
        methods: ["GET", "POST"],
        credentials: true
    }
));
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

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const key = require("./config/main.config");
const authenticationRouter = require("./route/authentication.route");
const userRouter = require("./route/user.route");
const airportRouter = require("./route/airport.route");
const airlinerRouter = require("./route/airliner.route");
const flightRouter = require("./route/flight.route");
const ticketRouter = require("./route/ticket.route");
const bookingRouter = require("./route/booking.route");

const { port, mongoUrl, corsOrigin } = key;

const app = express();

require("./db").connectMongoDb(mongoUrl);

var corsOption = {
  origin: corsOrigin,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.use("/authentication", authenticationRouter);

app.use("/user", userRouter);

app.use("/airport", airportRouter);

app.use("/airliner", airlinerRouter);

app.use("/flight", flightRouter);

app.use("/ticket", ticketRouter);

app.use("/booking", bookingRouter);

app.use(function (req, res) {
  res.status(404).json({ errors: ["Not found"] });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ errors: ["Internal Server Error"] });
});

app.listen(port, () => {
  console.log("Server is running at " + port);
});

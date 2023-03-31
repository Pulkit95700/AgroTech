const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("<h1>App is running</h1>");
});

const userRoute = require("./routes/userRoute");
app.use("/api/users", userRoute);

const weatherRoute = require("./routes/weatherRoute");
app.use("api/weather", weatherRoute);

const mspRoute = require("./routes/mspRoute");
app.use("/api/msp", mspRoute);

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

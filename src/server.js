require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/loans", require("./routes/loanRoutes"));

app.get("/", (req, res) => {
  res.send("Library API is running...");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

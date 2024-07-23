const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/index");
const cookieParser = require('cookie-parser')

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

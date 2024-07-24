const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const router = require("./router/index");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


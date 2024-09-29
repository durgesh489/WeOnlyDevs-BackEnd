const express = require("express");
const cors = require("cors");
const path = require("path");
require("./db/conn");
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const devRouter = require("./routers/developer");
const workRouter = require("./routers/work");

app.use(devRouter);
app.use(workRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`connection is setup at ${PORT}`);
});

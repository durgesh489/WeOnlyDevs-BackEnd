const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/onlydevs-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conncetion is successfull");
  }).catch((e)=>{
    console.log(e.message);
  });

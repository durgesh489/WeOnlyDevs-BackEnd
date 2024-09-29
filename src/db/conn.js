const mongoose = require("mongoose");

mongoose
  .connect("mongodb://user:Durgesh3344@147.79.70.33:27017/onlydevs-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conncetion is successfull");
  }).catch((e)=>{
    console.log(e.message);
  });

require("dotenv").config();
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require("cors");
const db_URL = process.env.DB_URL;
const port  = process.env.PORT||8000;
app.use(express.json());
app.use(cors());

mongoose
.connect(db_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

const userRoute = require("./routes/users");
const transactionRoute = require("./routes/transactions");
app.use("/user", userRoute); 
app.use("/transaction", transactionRoute); 

app.listen(port,()=>{console.log('server started at port',port)})
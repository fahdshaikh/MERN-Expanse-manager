const mongoose = require('mongoose')
const express = require('express')
const authRouter = require('./routes/auth')
const transactionRouter = require('./routes/transaction')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user",authRouter)
app.use("/api/transaction",transactionRouter)


mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true},()=>{
    console.log("The database is connected!")
})

app.listen(5000,()=>{
    console.log("Server is Up & Running")
})


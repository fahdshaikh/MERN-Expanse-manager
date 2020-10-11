const mongoose = require('mongoose');

const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const transactionSchema = new Schema({
    user_id:{
        type:ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Transaction",transactionSchema) 
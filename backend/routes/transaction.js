const express = require('express');

const Transaction = require('../models/Transaction')
const dotenv = require('dotenv')

const router = express.Router();
dotenv.config();

router.post("/post",async(req,res)=>{
    const payload = new Transaction(
        {
         user_id:req.body.user_id,
         title:req.body.title,
         type:req.body.type,
         amount:req.body.amount,
         timestamp:req.body.timestamp
        }
    )

    try{
        const savedTransaction = await payload.save();
        res.status(200).send("Transaction Details successfully posted")
    } catch(err){
        res.status(400).send(err)
    }
})

router.get("/get",async(req,res)=>{
    const uid = String(req.query.user_id);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {}

    const startIndex = (page-1)*limit;
    const endIndex = (page)*limit;

    if(endIndex < await Transaction.find({user_id:uid}).countDocuments().exec()){
        results.next = {
            page:page+1,
            limit:limit
        }
    }
    if(startIndex>0){
        results.prev - {
            page:page-1,
            limit:limit
        }
    }
    try{
        results.current = await Transaction.find({user_id:uid}).sort({_id:-1}).limit(limit).skip(startIndex).exec();
        results.total = await Transaction.find({user_id:uid}).countDocuments().exec();
        res.json(results);
    } catch(error){
        res.status(500).send(err)
    }
})

router.get('/get/credit',async(req,res)=>{
    const uid = String(req.query.user_id);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {}

    const startIndex = (page-1)*limit;
    const endIndex = (page)*limit;

    if(endIndex < await Transaction.find({user_id:uid}).countDocuments().exec()){
        results.next = {
            page:page+1,
            limit:limit
        }
    }
    if(startIndex>0){
        results.prev - {
            page:page-1,
            limit:limit
        }
    }
    try{
        results.current = await Transaction.find({user_id:uid,type:"Credit"}).sort({_id:-1}).limit(limit).skip(startIndex).exec();
        results.total = await Transaction.find({user_id:uid,type:"Credit"}).countDocuments().exec();
        res.json(results);
    } catch(error){
        res.status(500).send(err)
    }
})

router.get('/get/debit',async(req,res)=>{
    const uid = String(req.query.user_id);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {}

    const startIndex = (page-1)*limit;
    const endIndex = (page)*limit;

    if(endIndex < await Transaction.find({user_id:uid}).countDocuments().exec()){
        results.next = {
            page:page+1,
            limit:limit
        }
    }
    if(startIndex>0){
        results.prev - {
            page:page-1,
            limit:limit
        }
    }
    try{
        results.current = await Transaction.find({user_id:uid,type:"Debit"}).sort({_id:-1}).limit(limit).skip(startIndex).exec();
        results.total = await Transaction.find({user_id:uid,type:"Debit"}).countDocuments().exec();
        res.json(results);
    } catch(error){
        res.status(500).send(err)
    }
})

//FUTURE WORK TO DIRECTLY ACCESS THE SUM OF CREDIT AND DEBIT VALUES.....

// router.get('/details',async(req,res)=>{
    
//     try{
//         const uid = mongoose.Types.ObjectId(req.body.user_id)

//         let total_credit = await Transaction.aggregate([
//             {$match:{user_id:uid, type:"Credit"}},{$group:{_id:"$user_id",TotalCredit:{$sum:"$amount"}}}
//         ])
//         res.status(200).send(total_credit)
//     }catch(error){
//         res.status(500).send(error)
//     }
// })
module.exports = router
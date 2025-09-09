var express = require('express');
var router = express.Router();

const Products = require('../models/product');
const Categorys = require('../models/categorys');
const Users = require('../models/users');



router.get('/listCategory', async (req, res) => {
    try {
        const data = await Categorys.find();
        res.json({
            "status": 200,
            "messenger": "Danh sách Category",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/addCategory',async (req,res) => {
    try{
        const data = req.body;
        const newDistributor = new Categorys({
            name: data.name
        });
        const result = await newDistributor.save();
        if(result){
            const list = await Categorys.find().populate();
            res.json({
                "status":200,
                "msg":"Thêm thành công !!",
                "data": list
            });
        }
        else{
            res.json({
                "status":400,
                "msg":"Lỗi, thêm không thành công !!",
                "data": []
            })
        }
    }catch(error){
        console.log(error);
    }
});


module.exports = router;
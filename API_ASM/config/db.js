const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const local = "mongodb+srv://dathtph53550:fgBZBFtyJZ4teJtS@hoangdat.hwvdf.mongodb.net/ASM_CR101";

const connnect = async () => {
    try{
        await mongoose.connect(local);
        console.log("CONNECT THANH CONG");
    }catch(error){
        console.log(error);
        console.log("Connect that bai !!");
    }
};

module.exports = {connnect};
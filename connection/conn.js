const mongoose=require("mongoose")
const uri=`mongodb+srv://Naga:Naga@cluster0.yapktff.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', true)
mongoose.set('strictQuery', false);
function getConnection(){
    mongoose.connect(uri, (err) => {
        if(err) {
            console.log("Connection to mongodb failed")
        }
        else console.log("Connected to mongoDB successfully")
    })
}
module.exports=getConnection

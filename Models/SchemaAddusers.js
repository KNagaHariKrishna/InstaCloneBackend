const mongoose = require("mongoose")

const schema = mongoose.Schema

const postSchema = new schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    discription:{type:String,
        require:true
    },
    likes:{type:Number},
    date: Date,
    image:{
        type: String,
        required: true
    }
    // image: {
    //     match: /^(.*)(\.jpg|\.jpeg|\.png)$/i,
    //     public_id:{
    //     type: String,
    //     required: true}
    //   },
    //   url:{
    //     type:String,
    //     require:true
    //   }
})
const postModel = mongoose.model("Posts",postSchema)
module.exports=postModel
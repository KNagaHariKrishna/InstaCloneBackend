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
    image: {
        type: String,
        match: /^(.*)(\.jpg|\.jpeg|\.png)$/i,
        required: true
      }
})
const postModel = mongoose.model("Posts",postSchema)
module.exports=postModel
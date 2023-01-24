const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const connect = require("./connection/conn")
const cloudinary=require("cloudinary").v2
const fileUpload = require("express-fileupload")
connect()
const Posts = require("./Models/SchemaAddusers")
const env  = require("process")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))
// Configuration 
cloudinary.config({
    cloud_name: "dnraxpjmj",
    api_key: "778291694594572",
    api_secret: "pDeLAoSZtDGa7oaP2OBdI-TG_a8"
  });
app.get("/",(req,res)=>{
    res.send("ok")
})

app.post("/addpost",(req,res,next)=>{
    console.log(req.body)
    const {username,address,discription} = req.body
    const f=req.files.img;
    cloudinary.uploader.upload(f.tempFilePath,async (err,result)=>{
        if(err){
            res.json({message:err})
        }
        else{
                const post = await Posts.create({
                name:username,
                location:address,
                discription:discription,
                likes:parseInt(Math.random()*100)+20,
                date: new Date(),
                image:result.secure_url
            })
                res.json({
                status :"ok",
                data:post
            })
            console.log(post);
        }
    })
})
// app.post("/addpost",(req,res)=>{
//     const {username,address,discription} = req.body
//     const {image_file} = req.files
//     image_file.mv("./uploads/"+image_file.name, async (err)=>{
//         if(err){
//             res.json({message:err})
//         }
//         else{
//             // console.log(req.body);
//             const post = await Posts.create({
//                 name:username,
//                 location:address,
//                 discription:discription,
//                 likes:parseInt(Math.random()*100),
//                 date: new Date(),
//                 image:image_file.name
//             })
//             res.json({
//                 status :"ok",
//                 data:post
//             })
//         }      
//    })
// })

app.get("/getpost",async(req,res)=>{
    try{
        const posts = await Posts.find()
    res.json(posts) 
    }catch(e){
        res.json({message: e})
    }
})
app.get("/images/:fileName", async (req, res) => {
    // console.log(`./uploads/${req.params.fileName}`)
    res.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})

<<<<<<< HEAD
app.listen(8080 || process.env.PORT ,()=>{
=======
app.listen(8080 || process.env.PORT,()=>{
>>>>>>> 7cf9a9aaa74afb32c84265933e7e31f603d00377
    console.log("server is up");
})

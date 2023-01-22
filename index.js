const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const fileUpload = require("express-fileupload")
const connect = require("./connection/conn")
const { v4: uniqKeyGenerate } = require("uuid")
connect()
const Posts = require("./Models/SchemaAddusers")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use(fileUpload())
app.get("/",(req,res)=>{
    res.send("ok")
})
app.post("/addpost",(req,res)=>{
    const {username,address,discription} = req.body
    //console.log(req.body);
    const {image_file} = req.files
    //  console.log(image_file);
    // res.send(req.body)
    
    image_file.mv("./uploads/"+image_file.name, async (err)=>{
        if(err){
            res.json({message:err})
        }
        else{
            // console.log(req.body);
            const post = await Posts.create({
                name:username,
                location:address,
                discription:discription,
                likes:parseInt(Math.random()*100),
                date: new Date(),
                image:image_file.name
            })
            res.json({
                status :"ok",
                data:post
            })
        }      
   })
})

app.get("/getpost",async(req,res)=>{
    try{
        const posts = await Posts.find()
    // console.log(posts);
    res.json(posts) 
    }catch(e){
        res.json({message: e})
    }
})
app.get("/images/:fileName", async (req, res) => {
    // console.log(`./uploads/${req.params.fileName}`)
    res.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})

app.listen(8080,()=>{
    console.log("server is up");
})
const express=require("express");
const morgan=require("morgan");
const mongoose=require("mongoose");
const TeacherRouter=require("./Route/TeacherRoute");
const ChildRouter=require("./Route/ChildRouter");
const ClassRouter = require("./Route/ClassRouter");
const login=require("./Route/authenticationRouter");

const server=express();

mongoose.connect("mongodb://localhost:27017/nurese").then(()=>{
    const port =process.env.PORT||8080;

    console.log("db connected");
    server.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})
mongoose.connection.on("error",(err)=>{
    console.log(err);
}   
);  




server.use("/uploads", express.static("./uploads"));
server.use(morgan('dev'));


server.use(express.json());
server.use(express.urlencoded({extended: true}));


server.use(login);
server.use(TeacherRouter);
server.use(ChildRouter);
server.use(ClassRouter);



server.use((req,res)=>{
    res.status(404).json({message:"Not found"});
});


server.use((error,req,res,next)=>{
    res.status(500).json({message: error+""});
    
});







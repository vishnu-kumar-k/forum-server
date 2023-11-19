const express=require("express");

const routes=require("./Routes");

const app=express();
require("./db")
require("dotenv").config()
app.use(express.json());


app.use("/",routes);

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server Started at ${port}`);
})

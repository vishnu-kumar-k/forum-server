const express=require("express");

const routes=require("./Routes");

const app=express();
require("./db")
require("dotenv").config()
app.use(express.json());


app.use("/",routes);

const port=5050;
app.listen(port,()=>{
    console.log(`Server Started at ${port}`);
})

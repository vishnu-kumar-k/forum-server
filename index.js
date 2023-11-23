const express=require("express");

const routes=require("./Routes");
const formData = require('express-form-data');
const app=express();
const cors = require('cors');
const bodyparser = require('body-parser');
app.use(formData.parse());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(
    cors(
        {
            origin:"*",
        }
    )
  );
require("./db")
require("dotenv").config()
app.use(express.json());


app.use("/",routes);

const port=5050;
app.listen(port,()=>{
    console.log(`Server Started at ${port}`);
})

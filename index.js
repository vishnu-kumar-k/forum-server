const express=require("express");

const routes=require("./Routes");
const formData = require('express-form-data');
const cookieParser = require('cookie-parser');
const app=express();
const cors = require('cors');
require("./db")

const bodyparser = require('body-parser');

app.use(express.json());
app.use(formData.parse());
app.use(bodyparser.json());
app.use(cookieParser());
app.use(
    cors(
        {
            origin:"*",
            credentials:true
        }
    )
  );

require("dotenv").config()


app.use("/",routes);

const port=5050;
app.listen(port,()=>{
    console.log(`Server Started at ${port}`);
})

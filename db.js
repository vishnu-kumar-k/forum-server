const mongoose=require("mongoose");
mongoose.set("strictQuery",false);
mongoose.connect(process.env.URI);
const connection=mongoose.connection;

connection.on("connected",()=>{
    console.log("DB Connected...");
})

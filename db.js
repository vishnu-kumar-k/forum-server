const mongoose=require("mongoose");
mongoose.set("strictQuery",false);
mongoose.connect("mongodb+srv://admin:admin@cluster0.nao0uqd.mongodb.net/?retryWrites=true&w=majority");
const connection=mongoose.connection;

connection.on("connected",()=>{
    console.log("DB Connected...");
})

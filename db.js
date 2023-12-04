const mongoose=require("mongoose");
mongoose.set("strictQuery",false);
mongoose.connect("mongodb+srv://vishnuk55265:vishnuk55265@cluster0.svueomz.mongodb.net/?retryWrites=true&w=majority");
const connection=mongoose.connection;

connection.on("connected",()=>{
    console.log("DB Connected...");
})

import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js";
dotenv.config({
    path: './.env'
});


const app = express();
const PORT = process.env.PORT || 3000;

app.get("/",(req, res) => {
    res.send(`Server is running at 1232343`);
});
app.get("/sk",(req, res) => {
    res.send(`Server is running at Sk`);
});


connectDB()
.then(() => {
    app.listen(PORT,() => {
    console.log(`Server running at PORT : http://localhost:${PORT}`)
});
})
.catch((error) => {
    console.log("MongoDB connection Failed !!! ",error);
});
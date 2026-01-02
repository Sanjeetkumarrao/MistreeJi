import dotenv from "dotenv"
import express from "express"
dotenv.config({
    path: './.env'
})

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/",(req, res) => {
    res.send(`Server is running at 1232343`);
});
app.get("/sk",(req, res) => {
    res.send(`Server is running at Sk`);
});

app.listen(PORT,() => {
    console.log(`Server running at PORT : http://localhost:${PORT}`)
});
import express from "express"
const app = express()

import userRouter from "./routes/test.routes.js"

app.use("/", userRouter)

export {app}
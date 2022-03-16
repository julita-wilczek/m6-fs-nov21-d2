import express from "express";
import cors from "cors"
import pool from "./utilities/db.js"
import productsRouter from "./services/products.js";

const server = express()
const {PORT = 3001} = process.env

server.use(cors())
server.use(express.json())
server.use("/products", productsRouter)

const initialize = async () => {
    try {
        await pool.query("SELECT 1+1")
        server.listen(PORT, () => {
            console.log("Server listening on port " + PORT);
        })
        server.on("error", (error) => {
            console.log("Server is not running due to error: " + error)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

initialize()
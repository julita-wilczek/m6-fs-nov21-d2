import { Router } from "express";
import pool from "../utilities/db.js";


const productsRouter = Router()

productsRouter.get("/", async (req, res, next) => {
    try {
        const data = await pool.query("SELECT * FROM products;")
        res.send(data.rows)
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

productsRouter.get("/:product_id", async (req, res, next) => {
    try {
        const data = await pool.query("SELECT * FROM products WHERE product_id = $1;", [req.params.product_id])
        const product = data.rows[0]
        if (product) {
            res.send(product)
        } else {
            res.status(404).send({message: "Product not found"})
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

productsRouter.post("/", async (req, res, next) => {
    try {
        const data = await pool.query("INSERT INTO products(name, description, brand, price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *;", Object.values(req.body))
        const product = data.rows[0]
        res.status(201).send(product)
   
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

productsRouter.put("/:product_id", async (req, res, next) => {
    try {
        const data = await pool.query("UPDATE products SET first_name='William', last_name='Wales' WHERE product_id = $1 RETURNING *;", Object.values(req.body))
        res.send(data)
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

productsRouter.delete("/:product_id", async (req, res, next) => {
    try {
        const data = await pool.query("DELETE FROM products WHERE product_id = $1;", [req.params.product_id])
        res.status(204).send()
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})
productsRouter.post("/:product_id/upload", async (req, res, next) => {
    try {
        const data = await pool.query("")
        res.send(data)
    } catch(error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})

export default productsRouter
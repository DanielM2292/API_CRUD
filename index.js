//import { Express } from 'express'
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products.model");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.send("Hola desde Node API");
});

app.get('/api/products', async(req, res) => {
    try{
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/product/:id', async(req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/api/product/:id', async(req, res) =>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product){
            return res.status(404).json({message: "El producto no existe"})
        }

        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct)

    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.delete('/api/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const productDelete = await Product.findByIdAndDelete(id)

        if(!productDelete){
            return res.status(404).json({message: 'Producto no encontrado'})
        }

        res.status(200).json({message: 'Producto eliminado'})
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

mongoose
  .connect(
    "mongodb+srv://danielns871:lMoAjJ9UsxLUWTo7@cluster0.ptr3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("OK conexión exitosa");
    app.listen(4000, () => {
      console.log("Sever Corriendo en el Puerto 4000");
    });
  })
  .catch(() => {
    console.log("Fallo");
  });

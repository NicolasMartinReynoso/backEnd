import  express  from "express";
import ProductManager from "./manager/desafio.js";

const PORT = 8080
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const productManager = new ProductManager("./products.js")

const test = async ()=>{
    await productManager.addProduct("Producto prueba 1","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 2","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 3","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 4","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 5","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 6","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 7","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 8","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 9","Este es un producto prueba",200,"Sin Imagen","abc123",25)
    await productManager.addProduct("Producto prueba 10","Este es un producto prueba",200,"Sin Imagen","abc123",25)
}

app.get("/products/:id",async(req,res)=>{
    try {
        const { id } = req.params
        const product = await productManager.getProductById(Number(id))
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(400).send('product not found')
        }
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

app.get("/products",async(req,res)=>{
    try {
        const  {limit}  = req.query
        const products = await productManager.getProducts();

        if (limit!==undefined) {
         const filterProducts = await products.splice(0,parseInt(limit))
            res.status(200).json(filterProducts)
        }else{
          res.status(200).json(products)
        }

    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

app.listen(PORT,()=>{
    
})

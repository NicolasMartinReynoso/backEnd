class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title: this.title = title,
            description: this.description = description,
            price: this.price = price,
            thumbnail: this.thumbnail = thumbnail,
            code: this.code = code,
            stock: this.stock = stock,
            id: this.#newID() + 1,
        }

        if (this.#checkCode(code) === true) {
            console.log("Error: codigo de producto repetido")

        } else {this.products.push(product) }

    }

    #checkCode(code) {
        return this.products.some((product) => product.code == code)
    }

    #newID() {
        let maxId = 0
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        })
        return maxId;
    }
    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {

        const selection = this.products.find((product) => product.id === id)
        if (selection===undefined) {
            console.log("Error: ID de producto no encontrado") 
        } else {
           return console.log(selection)
        }
    }
}



const productManager = new ProductManager()
console.log(productManager.getProducts())
productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25)
console.log(productManager.getProducts())
productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25)

//prueba de id de producto encontrado
productManager.getProductById(1)

//prueba de id de producto no encontrado
productManager.getProductById(2)

const fs = require('fs')
const { title } = require('process')
const path = './products.json'

class ProductManager {
    constructor() {
        this.path = path
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const productsFile = await this.getProducts()
            const product = {
                title: this.title = title,
                description: this.description = description,
                price: this.price = price,
                thumbnail: this.thumbnail = thumbnail,
                code: this.code = code,
                stock: this.stock = stock,
                id: this.#newID(productsFile) + 1,
            }

            productsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile))

        } catch (error) {
            console.log(error)
        }
    }
    #newID(productsFile) {
        let maxId = 0
        productsFile.map((product) => {
            if (product.id > maxId) maxId = product.id;
        })
        return maxId;
    }


    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf8')
                const productsJs = JSON.parse(products)
                return productsJs
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const productsFile = await this.getProducts()
            const selection = productsFile.find((product) => product.id === id)
            if (selection === undefined) {
                console.log("Error: ID de producto no encontrado")
            } else {
                return console.log(selection)
            }
        } catch (error) {
            console.log(error)
        }

    }

    async deleteProduct(id) {
        try {
            const productsFile = await this.getProducts()
            const place = productsFile.findIndex((product) => product.id === id)
            if (place === -1) {
                console.log("No se encuentra producto con el Id ingresado")
            } else {
                productsFile.splice(place, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
            }

        } catch (error) {
            console.log(error)
        }

    }

    async updateProduct(id, title, description, price, thumbnail, code, stock) {
        try {
            const productsFile = await this.getProducts()
            const place = productsFile.findIndex((product) => product.id === id)
            const update = { id }
            if (place > -1) {
                if ((title === undefined)) {
                    update['title'] = productsFile[place].title
                } else {
                    update['title'] = title
                }
                if ((description === undefined)) {
                    update['description'] = productsFile[place].description
                } else {
                    update['description'] = description
                }
                if ((price === undefined)) {
                    update['price'] = productsFile[place].price
                } else {
                    update['price'] = price
                }
                if ((thumbnail === undefined)) {
                    update['thumbnail'] = productsFile[place].thumbnail
                } else {
                    update['thumbnail'] = thumbnail
                }
                if ((code === undefined)) {
                    update['code'] = productsFile[place].code
                } else {
                    update['code'] = code
                }
                if ((stock === undefined)) {
                    update['stock'] = productsFile[place].stock
                } else {
                    update['stock'] = stock
                }

             
                productsFile.splice(place, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
                productsFile.push(update)
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
              

                } else {
                    console.log("El Id de producto ingresado no es valido")
                }
            } catch (error) {
                console.log(error)
            } 
        }
}

const productManager = new ProductManager()

productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25)
//console.log(productManager.getProductById(1))
//productManager.updateProduct(2,"Cambio de datos", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25)
// productManager.deleteProduct(1)
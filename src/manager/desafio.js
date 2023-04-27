import fs from 'fs'

const path = './products.json'

export default class ProductManager {
    constructor() {
        this.path = path
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {

            const product = {
                title: this.title = title,
                description: this.description = description,
                price: this.price = price,
                thumbnail: this.thumbnail = thumbnail,
                code: this.code = code,
                stock: this.stock = stock,
                id: this.#newID(productsFile) + 1,
            }
            const productsFile = await this.getProducts()
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
                return selection
            }
        } catch (error) {
            console.log(error)
        }

    }

    async deleteProduct(id) {
        try {
            const productsFile = await this.getProducts()
            if (productsFile.lenght>0) {
                const newProductsFile = productsFile.filter(prod=>prod.id!==id)
                await fs.promises.writeFile(this.path,JSONstringify(newProductsFile))
            }else{
                throw new Error ("El id del producto no fue encontrado")
            }


        } catch (error) {
            console.log(error)
        }

    }

    async updateProduct(id, obj) {
        try {
            const productsFile = await this.getProducts()
            const place = productsFile.findIndex((product) => product.id === id)

            if (place===-1) {
                throw new Error ("Id not found")
            }else{
                productsFile[place]={...obj,id}
                await fs.promises.writeFile(this.path,JSONstringify(productsFile))
            }

            
        } catch (error) {
            console.log(error)
        }
    }

}

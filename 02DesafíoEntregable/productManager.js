const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path
    this.products = [];
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      if (!title || !description || !price || !thumbnail || !code) {
        console.log(`Todos los parámetros son obligatorios, solo el stock puede ser 0`);
        return false;
      } else {
        const checkProduct = await this.checkCode(code);
        if (checkProduct === 'OK') {
          const product = {
            id: this.getMaxID() + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
          };

          const productFile = await this.getProducts();
          productFile.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(productFile));

          console.log(`Producto ${code} creado`);
          return `Producto ${code} creado`;

        } else {
          console.log(`El producto ${code} ya existe`);
          return `El producto ${code} ya existe`;
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      const productsOld = await this.getProducts();
      const productToUpdate = await this.getProductById(id);

      if (productToUpdate) {
        productToUpdate.title = title || productToUpdate.title;
        productToUpdate.description = description || productToUpdate.description;
        productToUpdate.price = price || productToUpdate.price;
        productToUpdate.thumbnail = thumbnail || productToUpdate.thumbnail;
        productToUpdate.code = code || productToUpdate.code;
        productToUpdate.stock = stock || productToUpdate.stock;

        const updatedProducts = productsOld.map(product => {
          if (product.id === parseInt(id)) {
            return productToUpdate;
          }
          return product;
        });

        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
        console.log(`Producto con ID ${id} actualizado`);
        return `Producto con ID ${id} actualizado`;
      } else {
        console.log(`El ID del producto ${id} no existe`);
        return `El ID del producto ${id} no existe`;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  async getProductById(productId) {

    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf8');
        const datajs = JSON.parse(data);
        const product = datajs.find(product => product.id === productId);

        if (product) {
          console.log(product);
          return product;
        } else {
          console.log(`El ID del producto ${productId} no existe`);
          return `El ID del producto ${productId} no existe`;
        }
      }
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf8');
        const datajs = JSON.parse(data);
        this.products = datajs;
        return datajs
      } else {
        //console.log('estoy devolviendo el array vacio de getproducts');
        return []
      }
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  getMaxID() {
    const ids = this.products.map(product => product.id);
    if (ids.includes(1)) {
      return Math.max(...ids);
    } else {
      return 0;
    }
  }

  async checkCode(codeProduct) {
    try {
      const productCheck = await this.getProducts()
      if (!productCheck.find(product => product.code === codeProduct)) {
        //console.log('estoy ok en checkCode')
        return 'OK';
      } else {
        //console.log('doy error en checkCode')
        return 'Error';
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productsOld = await this.getProducts();
      const productToDelete = await this.getProductById(id);

      if (!productToDelete) {
        console.log(`El ID del producto ${id} no existe`);
        return `El ID del producto ${id} no existe`;
      }

      const updatedProducts = productsOld.filter(product => product.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));

      console.log(`Producto con ID ${id} eliminado`);
      return `Producto con ID ${id} eliminado`;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async deleteFile(path) {
    try {
      await fs.promises.unlink(path);
      console.log(`El archivo ${path} ha sido eliminado.`);
    } catch (error) {
      console.error(`Error al eliminar el archivo ${path}: ${error}`);
    }
  };
}

const manager = new ProductManager('./products.json');

const productTest1 = {
  title: "producto prueba",
  description: "este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25
};

const productTest2 = {
  title: "producto prueba 2 ",
  description: "solo me crearon para demostrar que no se repite el ID",
  price: 300,
  thumbnail: "sin imagen",
  code: "zyx789",
  stock: 30
}


const test = async () => {

  console.log('--------1ra consulta: llamando a "getProducts":', await manager.getProducts())

  console.log('--------2da consulta: agrego el primer producto con "addProduct"',)
  await manager.addProduct(productTest1)
  console.log(await manager.getProducts());

  console.log('--------3er consulta: intento de cargar un nuevo producto y repito la carga anterior con "addProduct"');
  await manager.addProduct(productTest2)
  await manager.addProduct(productTest1)

  console.log('--------4ta consulta: llamando a "getProducts":', await manager.getProducts())

  console.log('--------5ta consulta: llamando a "getProductsById (2)":');
  await manager.getProductById(2)

  console.log('------6ta consulta: modificación con "updateProduct":');
  await manager.updateProduct(1, '', '', 5874, '', '', '');
  console.log('--nuevo array', await manager.getProducts())

  console.log('------7ta consulta: modificación multiple con "updateProduct":');
  await manager.updateProduct(1, 'un nuevo título', '', 9999, '', '', '');
  console.log('--nuevo array', await manager.getProducts())

  console.log('------8va consulta: eliminación con "deleteProduct":')
  await manager.deleteProduct(1)

  console.log('muestra del array', await manager.getProducts())


  console.log('----------------------------------------------------------------');
  console.log('Se utiliza "deleteFile"');
  await manager.deleteFile('./products.json');
}

test()

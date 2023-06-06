class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code) {
      console.log(`Todos los parámetros son obligatorios, solo el stock puede ser 0`);
      return false;
    } else {
      const checkProduct = this.checkCode(code);
      if (checkProduct === 'OK') {
        const product = {
          id: this.getMaxID() + 1,
          code: code,
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          stock: stock
        };
        this.products.push(product);
        console.log(`Producto ${code} creado`);
        return `Producto ${code} creado`;
      } else {
        console.log(`El producto ${code} ya existe`);
        return `El producto ${code} ya existe`;
      }
    }
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);
    if (product) {
      console.log(product);
      return product;
    } else {
      console.log(`El ID del producto ${productId} no existe`);
      return `El ID del producto ${productId} no existe`;
    }
  }

  getProducts() {
    console.log(this.products);
    return this.products;
  }

  getMaxID() {
    const ids = this.products.map(product => product.id);
    if (ids.includes(1)) {
      return Math.max(...ids);
    } else {
      return 0;
    }
  }

  checkCode(codeProduct) {
    if (!this.products.find(product => product.code === codeProduct)) {
      return 'OK';
    } else {
      return 'Error';
    }
  }
}

const manager = new ProductManager();

manager.addProduct('VINO LAS PERDICES BAG IN BOX','Las perdices Reserva Duo Malbec Rose y Sauvignon Blanc',3336,'https://....','VINO001',0);
manager.addProduct('EUFORIA MALBEC','EUFORIA MALBEC DE FELIPE STAITI Y MARCELO PALLERITI',6410,'https://....','VINO002',5); // Error: código existente
manager.addProduct('FLORES NEGRAS','FLORES NEGRAS PINOT NOIR',1645,'https://....','VINO003',10);

console.log ('Detalle del array')

manager.getProducts();

console.log ('Busco el ID 2')
manager.getProductById(2);

console.log ('Busco el ID 8')

manager.getProductById(8); 
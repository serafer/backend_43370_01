export default function ProductDTO(product) {

  console.log('productDTO', product);
  return {
    
    title: product.nombre,
    description: product.descripcion,
    code: product.codigo,
    price: product.precio,
    status: product.estado,
    stock: product.stock,
    category: product.categoria,
    thumbnails: product.thumbnails
  };
}
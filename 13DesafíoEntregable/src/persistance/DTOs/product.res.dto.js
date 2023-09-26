// export default class ProductResDTO {
//     constructor(product) {
//         this.nombre = product.name
//         this.precio = product.price
//         this.disponibilidad = product.stock
//     }
// };


export default function ProductResDTO(product) {
    return {
        nombre: product.title,
        precio: product.price,
        disponibilidad: product.stock
    };
}
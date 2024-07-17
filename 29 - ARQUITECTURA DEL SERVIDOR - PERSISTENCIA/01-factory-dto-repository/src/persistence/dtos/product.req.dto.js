export default class ProductDTO {
  constructor(prod) {
    this.nombre = prod.name;
    this.descripcion = prod.description;
    this.precio = prod.price;
    this.disponibilidad = prod.stock;
  }
};

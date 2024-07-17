export default class ProductResDTO {
    constructor(prod){
        this.nombre = prod.nombre;
        this.precio = prod.precio;
        this.descripcion = prod.descripcion;
        this.fechaDeConsulta = new Date().toLocaleDateString();
        this.disponibilidad = prod.disponibilidad > 0 ? 'SI' : 'NO'
    }
}
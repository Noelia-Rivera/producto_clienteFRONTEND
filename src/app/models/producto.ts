export class Producto {
    id:number;
    nombre:String;
    precio:number;
    cantidad:number;

    constructor(id:number,nombre:String,precio:number,cantidad:number){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

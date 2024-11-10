export class Cliente {
    id:number;
    nombres:String;
    apellidos:String;
    dni:String;

    constructor(id:number,nombres:String,apellidos:String,dni:String){
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.dni = dni;
    }
}

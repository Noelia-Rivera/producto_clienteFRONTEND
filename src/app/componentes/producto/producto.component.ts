import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [HomeComponent, TableModule,ButtonModule,ButtonGroupModule,DialogModule,InputTextModule,ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  productos:Producto[]=[];
  visible: boolean = false;
  formProducto:FormGroup = new FormGroup({});
  isUpdate:boolean = false;
  
  constructor(
    private productoService:ProductoService,
  ){}

  ngOnInit():void{
    this.getAllProductos();
    this.formProducto = new FormGroup({
      id: new FormControl(''),
      nombre:new FormControl(''),
      precio:new FormControl(''),
      cantidad:new FormControl(''),
    });
  }

  
  getAllProductos(){
    this.productoService.getProductos().subscribe((data)=>{
      this.productos=data;
      console.log(this.productos);
    });
  }

  showDialog() {
    this.visible = true;
    this.isUpdate=false;
}

resetFormProducto(){
  this.formProducto.reset();
}

selectProducto(producto: any){
  this.isUpdate=true;
  this.visible = true;
  this.formProducto.controls['id'].setValue(producto.id);
  this.formProducto.controls['nombre'].setValue(producto.nombre);
  this.formProducto.controls['precio'].setValue(producto.precio);
  this.formProducto.controls['cantidad'].setValue(producto.cantidad);
}

CrearProductos() {    
  this.productoService.crearProducto(this.formProducto.value).subscribe({
    next: (resp) => {
      if (resp) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#fff', 
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          customClass: {
            popup: 'custom-toast-popup'
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Producto creado'
        });
        this.getAllProductos();
        this.formProducto.reset();
        this.visible=false;
      }
    },
    error: (err) => {
      console.error('Error creando el producto', err);
    }
  }
  );
}

actualizarProducto() {
  const producto = this.formProducto.value;
  if (!producto.id) {
    this.visible=false;
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El producto no tiene un ID válido para actualizar.',
      background: '#fff',
      customClass: {
        popup: 'custom-toast-popup'
      }
    });
    return;
  }

  this.productoService.editarProducto(producto).subscribe({
    next: (resp) => {
      if (resp) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#fff',
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          customClass: {
            popup: 'custom-toast-popup'
          }
        });
        
        Toast.fire({
          icon: 'success',
          title: 'Producto actualizado'
        });
        this.getAllProductos();
        this.formProducto.reset();
        this.visible=false;
      }
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: 'Ocurrió un error al intentar actualizar el producto. Intenta de nuevo más tarde.',
        background: '#fff',
        customClass: {
          popup: 'custom-toast-popup'
        }
      });
      console.error('Error al actualizar el producto:', err);
    }
  });
}

eliminarProducto(id: any){
  Swal.fire({
    title: "¿Estás seguro de borrar este Producto?",
    text: "¡No serás capaz de reveritrlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#19e212",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borralo!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Borrado!",
        text: "El dato ha sido borrado",
        icon: "success"
      });
      this.productoService.deleteProducto(id).subscribe(resp=>{this.getAllProductos();});
    }
  });
}

}

import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../service/cliente.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [HomeComponent, TableModule,ButtonModule,ButtonGroupModule,DialogModule,InputTextModule,ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clientes:Cliente[]=[];
  visible: boolean = false;
  formCliente:FormGroup = new FormGroup({});
  isUpdate:boolean = false;

  constructor(
    private clienteService:ClienteService,
    private messageService:MessageService
  ){}

  ngOnInit():void{
    this.getAllClientes();
    this.formCliente = new FormGroup({
      id: new FormControl(''),
      nombres:new FormControl(''),
      apellidos:new FormControl(''),
      dni:new FormControl(''),
    });
  }

  getAllClientes(){
    this.clienteService.getClientes().subscribe((data)=>{
      this.clientes=data;
      console.log(this.clientes);
    });
  }

  showDialog() {
    this.resetFormCliente();
    this.visible = true;
    this.isUpdate=false;
}

resetFormCliente(){
  this.formCliente.reset();
}


selectCliente(cliente: any){
  this.isUpdate=true;
  this.visible = true;
  this.formCliente.controls['id'].setValue(cliente.id);
  this.formCliente.controls['nombres'].setValue(cliente.nombres);
  this.formCliente.controls['apellidos'].setValue(cliente.apellidos);
  this.formCliente.controls['dni'].setValue(cliente.dni);
}

CrearClientes() {    
  const cliente = this.formCliente.value;

  if (cliente.dni.length !== 8) {
    this.visible = false;
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El DNI debe tener exactamente 8 dígitos.',
      background: '#fff',
      customClass: {
        popup: 'custom-toast-popup'
      }
    });
    return; 
  }
  this.clienteService.crearCliente(this.formCliente.value).subscribe({
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
          title: 'Cliente creado'
        });
        this.getAllClientes();
        this.formCliente.reset();
        this.visible=false;
      }
    },
    error: (err) => {
      console.error('Error creando el cliente', err);
    }
  }
  );
}

actualizarCliente() {
  const cliente = this.formCliente.value;

  if (cliente.dni.length !== 8) {
    this.visible = false;
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El DNI debe tener exactamente 8 dígitos.',
      background: '#fff',
      customClass: {
        popup: 'custom-toast-popup'
      }
    });
    return; 
  }

  this.clienteService.editarCliente(cliente).subscribe({
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
          title: 'Cliente actualizado'
        });
        this.getAllClientes();
        this.formCliente.reset();
        this.visible = false;
      }
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: 'Ocurrió un error al intentar actualizar el cliente. Intenta de nuevo más tarde.',
        background: '#fff',
        customClass: {
          popup: 'custom-toast-popup'
        }
      });
      console.error('Error al actualizar el cliente:', err);
    }
  });
}

eliminarCliente(id: any){
  Swal.fire({
    title: "¿Estás seguro de borrar este Cliente?",
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
      this.clienteService.deleteCliente(id).subscribe(resp=>{this.getAllClientes();});
    }
  });
}
}

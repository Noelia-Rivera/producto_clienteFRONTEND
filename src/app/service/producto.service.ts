import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl="http://localhost:8080/api/productos"
  constructor(private http: HttpClient) { }

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiUrl);
  }
  getProductoById(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
  crearProducto(producto: Producto):Observable<Producto>{
    return this.http.post<Producto>(this.apiUrl,producto);
  }
  editarProducto(producto: Producto):Observable<Producto>{
    return this.http.post<Producto>(this.apiUrl,producto);
  }
  deleteProducto(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

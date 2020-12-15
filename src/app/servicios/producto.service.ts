import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  urlProducto : String;

  constructor(private http: HttpClient) {
    this.urlProducto = `${environment.API_URL}/api/productos/`
   }

   list (): Observable <any> {
    return this.http.get<Array<any>>(this.urlProducto+'list');
   }

   create (producto) {
    let params = JSON.stringify(producto);//convertir el objeto a uno objeto JSON
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.post(this.urlProducto+'create',params,{headers: headers});
   }

   delete (id) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.delete(this.urlProducto+`delete/${id}`,{headers: headers});
   }

   update (id) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.put(this.urlProducto+`update/${id}`,{headers: headers});
   }

   findId (id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.urlProducto+`find/${id}`,{headers: headers});
   }
  
}

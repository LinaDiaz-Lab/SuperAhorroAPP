import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Factura } from '../interfaces/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
    urlFactura : String;

    constructor(private http: HttpClient) {
      this.urlFactura =`${environment.API_URL}/api/facturas/`
     }
  
     list () {
      let headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
       })

      return this.http.get<Array<Factura>>(this.urlFactura+'list',{headers: headers});
     }
  
     create (factura) {
      let params = JSON.stringify(factura);//convertir el objeto a uno objeto JSON
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      return this.http.post(this.urlFactura+'create',params,{headers: headers});
     }
  
     delete (id) {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      return this.http.delete(this.urlFactura+`delete/${id}`,{headers: headers});
     }
  
     update (id) {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      return this.http.put(this.urlFactura+`update/${id}`,{headers: headers});
     }
  
     findId (id) {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      return this.http.get(this.urlFactura+`find/${id}`,{headers: headers});
     }
  
}

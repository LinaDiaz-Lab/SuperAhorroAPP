import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlCliente : String;

  constructor(private http: HttpClient) {
    this.urlCliente = 'https://localhost:3000/api/clientes/'
   }

   list () {
    return this.http.get<Array<Cliente>>(this.urlCliente+'list');
   }

   create (cliente) {
    let params = JSON.stringify(cliente);//convertir el objeto a uno objeto JSON
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.urlCliente+'create',params,{headers: headers});
   }

   delete (id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.delete(this.urlCliente+`delete/${id}`,{headers: headers});
   }

   update (id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(this.urlCliente+`update/${id}`,{headers: headers});
   }

   findId (id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(this.urlCliente+`find/${id}`,{headers: headers});
   }
  
   autenticacion (usuario, contrasena ) {
    let llave = {usuario: usuario, contrasena: contrasena }
    let params = JSON.stringify(llave);//convertir el objeto a uno objeto JSON
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.urlCliente+'autenticacion',params,{headers: headers});
   }

}

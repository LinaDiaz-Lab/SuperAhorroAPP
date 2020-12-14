import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente'
import { environment } from '../../environments/environment'
//archivo que nos deja colocar variables de entorno, comola ruta de la API o alguna credencial de algun servico como Dropbox
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlCliente : String;

  private autenticacionToken = new BehaviorSubject<{}>({});//parte reactivo   1
  token$ = this.autenticacionToken.asObservable();//parte observable, ventana que se puede mirar si hay cambios     2

  constructor(private http: HttpClient) {
    
    this.autenticacionToken.next(this.obtenerInformacionDelUsuario());

    this.urlCliente = `${environment.API_URL}/api/clientes/`
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
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })
     
    return this.http.delete(this.urlCliente+`delete/${id}`,{headers: headers});
   }

   update (id: String, datos ) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.put(this.urlCliente+`update/${id}`,datos,{headers: headers});
   }

   findId (id: String) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.get<Cliente>(this.urlCliente+`find/${id}`,{headers: headers});
   }
   
   autenticacion (credenciales = {} ) {
    return this.http.post(this.urlCliente+'autenticacion',credenciales)
   }

   cerrarSesion() {
     localStorage.removeItem('SuperAhorroClient');
     this.autenticacionToken.next(null);
   }

   guardarToken(jwtToken: any) {
    localStorage.setItem('SuperAhorroClient', jwtToken);
    this.autenticacionToken.next(this.obtenerInformacionDelUsuario());//notifica el nuevo usuario
  }

   obtenerInformacionDelUsuario() {
    // Consulto el Token
    const token = localStorage.getItem('SuperAhorroClient')

    if(token){
      const baseUrl = token.split('.')[1]; // Acá extraemos solo la parte del medio del token
      const base = baseUrl.replace('-', '+').replace('_', '/');
      let infoDelUsuario = decodeURIComponent(atob(base).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(infoDelUsuario);//convertirlo en objeto JavaScript
    }
    return null
  }
}
/**
 * autenticacion (usuario, contrasena ) {
    let llave = {usuario: usuario, contrasena: contrasena }
    let params = JSON.stringify(llave);//convertir el objeto a uno objeto JSON
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.urlCliente+'autenticacion',params,{headers: headers})
 */

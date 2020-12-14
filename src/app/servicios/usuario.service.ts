import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Usuario } from '../interfaces/usuario';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlUsuario : String;

  private autenticacionToken = new BehaviorSubject<{}>({});
  token$ = this.autenticacionToken.asObservable();

  constructor(private http: HttpClient) {
    this.autenticacionToken.next(this.obtenerInformacionDelUsuario());

    this.urlUsuario = `${environment.API_URL}/api/usuarios/`
   }

   list () {
    return this.http.get<Array<Usuario>>(this.urlUsuario+'list');
   }

   create (usuario) {
    let params = JSON.stringify(usuario);//convertir el objeto a uno objeto JSON
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.post(this.urlUsuario+'create',params,{headers: headers});
   }

   delete (id) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.delete(this.urlUsuario+`delete/${id}`,{headers: headers});
   }

   update (id) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.put(this.urlUsuario+`update/${id}`,{headers: headers});
   }

   findId (id) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('SuperAhorroClient')}`
     })

    return this.http.get(this.urlUsuario+`find/${id}`,{headers: headers});
   }
  
   autenticacion (credenciales = {} ) {
    return this.http.post(this.urlUsuario+'autenticacion',credenciales)
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

import { Component} from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../../interfaces/cliente'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  role = 'Administrador';
  info = null;
  
  constructor( 
    private clienteServicio: ClienteService
    ) {
      this.clienteServicio.token$.subscribe(
      (cliente)=>{
        console.log('cliente  ',cliente)
        this.info = cliente
      }
    )
    
  }

  cerrarSesion(){
    this.clienteServicio.cerrarSesion()
  }


}

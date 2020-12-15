import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../../servicios/cliente.service'
import { Cliente } from '../../../../interfaces/cliente'
import swal from 'sweetalert';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss'],
  providers: [ ClienteService ]
})
export class ListaClienteComponent implements OnInit {
  clientes: Array<Cliente> = [];

  constructor( private clienteService: ClienteService ) { }

  ngOnInit(): void {
     this.cargarClientes()
  }

  cargarClientes(){ 
    this.clienteService.list()
    .subscribe( (res) => {
      this.clientes = res
    },
    (error) => {
      console.error('Error al intentar encontrar los clientes', error)
    }
     )
  }

  eliminarUsuarios(id){
    this.clienteService.delete(id)
    .subscribe(
      (usuarioEliminado) =>{
        swal({
          title: "Usuario Eliminado",
          icon: "success",
        });
        this.cargarClientes();
       },
      (err) => {
        console.error('Error ', err)
      }
    )
  }

  actualizarUsuarios(){
    
  }

}

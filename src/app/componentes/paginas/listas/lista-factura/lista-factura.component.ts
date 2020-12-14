import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/servicios/factura.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Factura } from '../../../../interfaces/factura'

@Component({
  selector: 'app-lista-factura',
  templateUrl: './lista-factura.component.html',
  styleUrls: ['./lista-factura.component.scss']
})
export class ListaFacturaComponent implements OnInit {
  facturas : Array<Factura> = [];
  info;

  constructor(
    private facturaServicio: FacturaService,
    private servicioUsuarios: UsuarioService
  ) { }

  ngOnInit(): void {
    this.servicioUsuarios.token$.subscribe(
      (usuario)=>{
        this.info = usuario
        if(this.info ){
          this.cargarFacturas()
        }
      }
    )
  }
  
  cargarFacturas() {
    this.facturaServicio.list()
    .subscribe(
      (listaFacturas) =>{
        this.facturas = listaFacturas
      },
      (err) => {
        console.error('Error ', err)
      }
    )
  }

  actualizarProducto(){
    
  }

}

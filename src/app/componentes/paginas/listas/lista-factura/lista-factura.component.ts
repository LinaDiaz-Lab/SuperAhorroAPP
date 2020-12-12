import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/servicios/factura.service';
import { Factura } from '../../../../interfaces/factura'

@Component({
  selector: 'app-lista-factura',
  templateUrl: './lista-factura.component.html',
  styleUrls: ['./lista-factura.component.scss']
})
export class ListaFacturaComponent implements OnInit {
  facturas : Array<Factura> = [];

  constructor(
    private facturaServicio: FacturaService
  ) { }

  ngOnInit(): void {
    this.cargarFacturas()
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

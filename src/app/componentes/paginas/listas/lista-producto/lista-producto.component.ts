import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from '../../../../interfaces/producto'
import swal from 'sweetalert';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {
  productos : Array<Producto> = [];

  constructor(
    private servicioProducto: ProductoService
  ) {} 
    
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.servicioProducto.list()
    .subscribe(
      (listaProductos) =>{
        this.productos = listaProductos
      },
      (err) => {
        console.error('Error ', err)
      }
    )
  }

  eliminarProducto(){

  }

  actualizarProducto(){
    
  }

  crearProducto(){
    
  }

}

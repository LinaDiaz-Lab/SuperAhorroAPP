import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../servicios/producto.service'
import { Producto } from '../../..//interfaces/producto';
import swal from 'sweetalert';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  productos: Array<Producto> = [];

  constructor(private servicioProductos: ProductoService,
    ) { 
    this.cargarProductos()
  }

  ngOnInit(): void {
    this.cargarProductos()
  }

  cargarProductos(){
    this.servicioProductos.list()
    .subscribe(
      (producto) => {
        this.productos = producto
      },
      (err) => {
        console.error('Erro al traer los productos ', err);
            swal(
              {
                title: "Error al listar los productos",
                text: "Intenta de nuevo",
                icon: "warning",
                dangerMode: true,
              });
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../../interfaces/producto'
import swal from 'sweetalert';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {
  productos : Array<Producto> = [];
  formularioCrearProducto: FormGroup;
  info;

  constructor(
    private formBuilder: FormBuilder, 
    private servicioProducto: ProductoService,
    private usuarioServicio: UsuarioService,
    private modal: NgbModal
  ) {
    this.formularioCrearProducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      precio: [0, Validators.required],
      categoria: ['', Validators.required],
      cantInventario: [0, Validators.required],
      urlImg: ['', Validators.required]
    })
  } 
    
  ngOnInit(): void {
    this.usuarioServicio.token$.subscribe(
      (usuario)=>{
        this.info = usuario
        console.log('usuario', usuario)
        if(this.info ){
          this.crearProducto()
        }
      }
    )

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
    if(this.formularioCrearProducto.valid){
      this.servicioProducto.create(this.formularioCrearProducto.value)
      .subscribe(
        (res) => {
          console.log('Exito al crear producto', res)
          swal({
            title:"Has creado un nuevo producto",
            icon: "success"
          })
        },
        (error) => {
          console.error('Error al crear producto', error)
          swal({
        title: "Oops!",
        text: "Tienes un error",
        icon: "warning",
        dangerMode: true,
      })
        }
      )
    }
  }

  open(contenido){
    this.modal.open(contenido)
  }

  
  
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})
export class ListaUsuarioComponent implements OnInit {
  usuarios : Array<Usuario> = [];
  formularioCrearUsuario: FormGroup;
  info;

  constructor(
    private servicioUsuarios: UsuarioService,
    private formBuilder: FormBuilder,
    private modal: NgbModal
  ) {
    this.formularioCrearUsuario = this.formBuilder.group({
      nombre: ['', Validators.required],
      ocupacion: ['', Validators.required],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
    })
  } 
    
  ngOnInit(): void {
    this.servicioUsuarios.token$.subscribe(
      (usuario)=>{
        this.info = usuario
        if(this.info ){
          this.crearUsuarios()
        }
      }
    )

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.servicioUsuarios.list()
    .subscribe(
      (listaUsuarios) =>{
        this.usuarios = listaUsuarios
      },
      (err) => {
        console.error('Error ', err)
      }
    )
  }

  eliminarUsuarios(id){
    this.servicioUsuarios.delete(id)
    .subscribe(
      (usuarioEliminado) =>{
        swal({
          title: "Usuario Eliminado",
          icon: "success",
        });
        this.cargarUsuarios();
       },
      (err) => {
        console.error('Error ', err)
      }
    )
  }

  actualizarUsuarios(){
    
  }

  crearUsuarios(){
    if(this.formularioCrearUsuario.valid){
      this.servicioUsuarios.create(this.formularioCrearUsuario.value)
      .subscribe(
        (res) => {
          console.log('Exito al crear producto', res)
        },
        (error) => {
          console.error('Error al crear producto', error)
        }
      )
    } 
  }

  open(contenido){
    this.modal.open(contenido)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { ClienteService } from '../../../servicios/cliente.service';
import { Cliente } from '../../../interfaces/cliente'
import swal from 'sweetalert';

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.scss']
})
export class ActualizarDatosComponent implements OnInit {
  cliente: Cliente = {
    _id: '',
    nombre: '',
    apellido: '',
    usuario: '',
    contrasena: '',
    correo: '',
    direcciones: [],
    telefono: '',
    tipoDoc: '',
    numDoc: '',
    fechaRegistro: '',
  };

  formularioActualizarDatos: FormGroup;
  info;
  
  constructor(
    private clienteServicio: ClienteService,
    private formBuilder: FormBuilder
  ) {
    this.formularioActualizarDatos = this.formBuilder.group({
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      tipoDoc: '',
      numDoc: ''
    })
  }

  ngOnInit(): void {
    this.clienteServicio.token$.subscribe(
      (cliente)=>{
        this.info = cliente
        if(this.info ){
          this.cargarCliente()
        }
      }
    )
  }

  actualizarDatos() {
    if (this.formularioActualizarDatos.valid) {
      this.clienteServicio.update(this.info.id,this.formularioActualizarDatos.value )
        .subscribe(
          (cliente) => {
            swal({
              title:"Has actualizado tu informacion con exito",
              text: "Vuelve a la pagina de inicio",
              icon: "success"
            });
          }, (err) => {
            console.error('No funciono', err)
            swal(
              {
                title: 'No se puedieron actualizar tus datos',
                text: "Intenta de nuevo",
                icon: "warning",
                dangerMode: true,
              });
          }
        )
    }
  }

  cargarCliente(){
    this.clienteServicio.findId(this.info.id)
        .subscribe(
          (clienteConsultado) => {
            this.cliente = clienteConsultado
            console.log('cliente  ', clienteConsultado)
          }, (err) => {
          console.error('Error: ', err)
         }
        )
  }
}
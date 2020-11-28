import { Direccion } from './direccion'

export interface Cliente {
    nombre: String,
    apellido: String,
    usuario: String,
    contrasena: String,
    direcciones: Direccion [],
    telefono: String,
    tipoDoc: String,
    numDoc: String,
    fechaRegistro: String
}

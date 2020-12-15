import { Direccion } from './direccion'

export interface Cliente {
    _id: string;
    nombre: string;
    apellido: string;
    usuario: string;
    contrasena: string;
    correo: string;
    direcciones: Direccion [];
    telefono: string;
    tipoDoc: string;
    numDoc: string;
    fechaRegistro: string
}

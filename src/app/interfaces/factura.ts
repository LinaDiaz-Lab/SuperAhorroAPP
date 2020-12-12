import { from } from 'rxjs';
import { Detalle } from './detalle'

export interface Factura {
    _id:String;
    fecha: Date;
    idCliente: Object;
    detalle: Detalle [];
    total: Number;
    iva: Number;
    totalIva: Number;
    idDireccion: String;
    mediodePago: String
}

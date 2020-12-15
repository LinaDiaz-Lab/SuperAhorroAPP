import { Detalle } from './detalle'

export interface Factura {
    _id:string;
    fecha: Date;
    idCliente: Object;
    detalle: Detalle [];
    total: number;
    iva: number;
    totalIva: number;
    idDireccion: string;
    mediodePago: string
}

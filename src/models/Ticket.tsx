import VersionProducto from "./VersionProducto";

export default interface Ticket {
    titulo: string,
    descripcion: string,
    fechaCreacion: Date,
    fechaFinalizacion: Date,
    severidadTicket: string,
    legajoEmpleado: number,
    idCliente: number,
    versionProducto: VersionProducto,
    numeroTicket: number,
    tipoTicket: string,
    estadoTicket: string
  }

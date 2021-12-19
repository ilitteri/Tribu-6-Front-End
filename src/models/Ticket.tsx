export default interface Ticket {
    titulo: string,
    descripcion: string,
    fechaCreacion: Date,
    fechaFinalizacion: Date,
    severidadTicket: string,
    legajoEmpleado: number,
    idCliente: number,
    idVersionProducto: number,
    numeroTicket: number,
    tipoTicket: string,
    estadoTicket: string
  }

import { Flex, Heading } from '@chakra-ui/layout'

import {
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Spinner
  } from '@chakra-ui/react'

interface Props {
  tickets: Ticket[],
  empleados: Empleado[],
  loading: boolean
}
interface Empleado {
  id: number,
  legajo: number,
  Nombre: string,
  Apellido: string
}
interface Ticket {
  titulo: string,
  fechaCreacion: Date,
  severidadTicket: string,
  legajoEmpleado: number
}

type diasSeveridad = {
    [key: string]: number
}

const diasPorSeveridad: diasSeveridad = {
    "S1": 1,
    "S2": 7,
    "S3": 30,
    "S4": 365
}

const ListadoTickets = ({ tickets, empleados, loading }: Props) => {

    function parseDate(fechaCreacion: Date): string {
        return new Date(fechaCreacion).toLocaleDateString("Fr");
    }

    function getDiasRestantes(fechaCreacion: Date, severidad: string): string {
        var diasTotales = diasPorSeveridad[severidad];
        if(!diasTotales) return "SIN VENCIMIENTO"; // definir mensaje

        var fechaCreacion = new Date(fechaCreacion)
        var fechaVencimiento = new Date(fechaCreacion)
        fechaVencimiento.setDate(fechaCreacion.getDate() + diasTotales);
        var dia = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        var diasParaVencimiento = Math.round(Math.abs((fechaCreacion.getTime() - fechaVencimiento.getTime()) / (dia)));
        return diasParaVencimiento > 0 ? diasParaVencimiento.toString() : "ATRASADA" //definir mensaje
    }

    function getNombreEmpleado(idEmpleado: number ): string {
      var empleadoEncontrado = empleados.find(empleado => empleado.id === idEmpleado)
      if (empleadoEncontrado){
        return empleadoEncontrado.Nombre + " " + empleadoEncontrado.Apellido;
      }
      return "-";
    }

    if (loading) {
      return (
          <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
              <Spinner />
          </Flex>
      )
    }

    return tickets && tickets.length === 0 ? (
      <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
      <Heading as='h3' size='md' mt="5vh">
          No hay tickets creados para esta versión de producto.
      </Heading>
  </Flex>
  ) : (
      <Table mt="2vh" variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Fecha creación</Th>
            <Th>Severidad</Th>
            <Th>Persona asignada</Th>
            <Th>Días restantes</Th>
            <Th>Acciones</Th>

          </Tr>
        </Thead>
        <Tbody>
          {tickets.map((ticket) => {
            return (
              <Tr>
                <Td w="30%">{ticket.titulo}</Td>
                <Td w="10%">{parseDate(ticket.fechaCreacion)}</Td>
                <Td w="10%">{ticket.severidadTicket}</Td>
                <Td w="15%">{getNombreEmpleado(ticket.legajoEmpleado)}</Td>
                <Td w="15%">{getDiasRestantes(ticket.fechaCreacion, ticket.severidadTicket)}</Td>
                <Td w="20%">ACCIONES</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
  )
}

export default ListadoTickets

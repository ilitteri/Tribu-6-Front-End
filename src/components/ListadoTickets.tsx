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
import { useNavigate } from 'react-router-dom'
import Empleado from '../models/Empleado'
import Ticket from '../models/Ticket'

interface Props {
  tickets: Ticket[],
  empleados: Empleado[],
  loading: boolean
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

type estados = {
  [key: string]: string
}

const estadosTicket: estados = {
  "ABIERTO": "Abierto",
  "ECLIENTE": "A la espera del cliente",
  "EDESARROLLO": "A la espera de desarrollo",
  "CERRADO": "Cerrado",
  "EPROGRESO": "En progreso",
}

const ListadoTickets = ({ tickets, empleados, loading }: Props) => {

    const navigate = useNavigate()

    function parseDate(fechaCreacion: Date): string {
        return new Date(fechaCreacion).toLocaleDateString("Fr");
    }

    function getDiasRestantes(fechaCreacion: Date, severidad: string): string {
        var diasTotales = diasPorSeveridad[severidad];
        if(!diasTotales) return "Sin vencimiento";

        var dia = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        var hoy = new Date();
        var creacion = new Date(fechaCreacion);

        var diasTranscurridos = Math.floor((Math.abs(creacion.getTime() - hoy.getTime())) / (dia));
        var diasParaVencimiento = diasTotales - diasTranscurridos;

        return diasParaVencimiento > 0 ? diasParaVencimiento.toString() : "ATRASADA"
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
          No hay tickets creados
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
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tickets.map((ticket) => {
            return (
              <Tr
              cursor="pointer"
              _hover={{
                fontWeight: 'bold'
              }}
              onClick={() => navigate(`/soporte/ticket/${ticket.numeroTicket}`)}>
                <Td w="30%">{ticket.titulo}</Td>
                <Td w="10%">{parseDate(ticket.fechaCreacion)}</Td>
                <Td w="10%">{ticket.severidadTicket}</Td>
                <Td w="15%">{getNombreEmpleado(ticket.legajoEmpleado)}</Td>
                <Td w="10%">{getDiasRestantes(ticket.fechaCreacion, ticket.severidadTicket)}</Td>
                <Td w="10%">{estadosTicket[ticket.estadoTicket]}</Td>
                <Td w="15%">ACCIONES</Td>
                {/* definir acciones */}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
  )
}

export default ListadoTickets

import { Flex, Heading } from '@chakra-ui/layout'

import {
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Spinner,
    useDisclosure,
    toast,
    useToast
  } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { soporteAPI } from '../axios'
import Empleado from '../models/Empleado'
import Ticket from '../models/Ticket'
import ActionButtons from './ActionButtons'
import ConfirmarCierreTicketModal from './ConfirmarCierreTicketModal'

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

type obj = {
  [key: string]: string
}

const severidad: obj = {
  "SIN_SEVERIDAD": "Sin severidad",
  "S1": "S1",
  "S2": "S2",
  "S3": "S3",
  "S4": "S4"
}

const estadosTicket: obj = {
  "ABIERTO": "Abierto",
  "ECLIENTE": "A la espera del cliente",
  "EDESARROLLO": "A la espera de desarrollo",
  "CERRADO": "Cerrado",
  "EPROGRESO": "En progreso",
}

const ListadoTickets = ({ tickets, empleados, loading }: Props) => {
  const toast = useToast()
  const patch = async(ticket: any) => {
    try {
      await soporteAPI.patch('/tickets/'+ ticket.numeroTicket, {estado: "CERRADO"})
      toast({
        duration : 2000,
        onCloseComplete: () =>{
          window.location.reload()
        },
        title: 'Ticket cerrado',
        status: 'success',
        isClosable: true,
      })
      
    } catch (err) {
      toast({
        title: 'Ocurrió un error al intentar cerrar el ticket ',
        status: 'error',
        isClosable: true,
      })
    }
  }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const [ticketACerrar, setTicketACerrar] = useState <Ticket>()

    const handleEdit = (ticketId: any) => {
      navigate(`/soporte/ticket/${ticketId}/editar`)
    }

    function parseDate(fechaCreacion: Date): string {
        return new Date(fechaCreacion).toLocaleDateString("Fr");
    }

    function getDiasRestantes(fechaCreacion: Date, severidad: string, estadoTicket: string): string {
        if(estadoTicket === "CERRADO"){
          return "-"
        }
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
    <>
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
              <Tr>
                <Td cursor="pointer" onClick={() => navigate(`/soporte/ticket/${ticket.numeroTicket}`)}>
                  {ticket.titulo}
                </Td>
                <Td cursor="pointer" onClick={() => navigate(`/soporte/ticket/${ticket.numeroTicket}`)}>
                  {parseDate(ticket.fechaCreacion)}
                </Td>
                <Td cursor="pointer" onClick={() => navigate(`/soporte/ticket/${ticket.numeroTicket}`)}>
                  {severidad[ticket.severidadTicket]}
                </Td>
                <Td cursor="pointer" onClick={() => navigate(`/soporte/ticket/${ticket.numeroTicket}`)}>
                  {getNombreEmpleado(ticket.legajoEmpleado) }
                </Td>
                <Td cursor="pointer" onClick={() => navigate(`/soporte/ticket/${ticket.numeroTicket}`)}>
                  {getDiasRestantes(ticket.fechaCreacion, ticket.severidadTicket,ticket.estadoTicket)}
                </Td>
                <Td cursor="pointer" onClick={() => navigate(`/soporte/ticket/${ticket.numeroTicket}`)}>
                  {estadosTicket[ticket.estadoTicket]}
                </Td>
                <Td w="100px">
                  {ticket.estadoTicket !== "CERRADO" &&<ActionButtons
                    onEdit={() => {
                      handleEdit(ticket.numeroTicket)
                    }}
                    onCloseTicket={() => {
                      setTicketACerrar(ticket)
                      onOpen()
                    }}
                  />
                  }
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
            {ticketACerrar && (
              <ConfirmarCierreTicketModal
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={() => patch(ticketACerrar)}
                alertHeader="Cerrar ticket"
                alertBody={
                  <>
                    ¿Estás seguro que querés cerrar el ticket de forma permanente?
                  </>
                }
              />
            )}
            </>
  )
}

export default ListadoTickets

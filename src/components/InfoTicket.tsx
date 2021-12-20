import {
    Spinner,
    Flex,
    Heading,
    Text,
    Table,
    Tbody,
    Td,
    Tr,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Cliente from '../models/Cliente'
import Empleado from '../models/Empleado'
import Ticket from '../models/Ticket'
import ActionButtons from './ActionButtons'

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

interface Props {
    ticket: Ticket
    cliente: Cliente
    empleado: Empleado
    loading: boolean
}

  const InfoLabels = ({ titulo, info }: any) => {
    return (
      <Flex>
        <Text fontWeight="bold" mr="5px">
          {titulo}
        </Text>
        <Text>{info}</Text>
      </Flex>
    )
  }

  const InfoTicket = ({ ticket, cliente, empleado, loading }: Props) => {
    const navigate = useNavigate()

    const handleEdit = (ticketId: any) => {
      navigate(`/soporte/ticket/${ticketId}/editar`)
    }

    if (loading) {
      return (
        <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )
    }

    return ticket ? (
      <Flex direction="column" justifyContent="flex-start">
        <Flex>
          <Heading mr={5}>{ticket.titulo} ( #{ticket.numeroTicket} )</Heading>
          {ticket.estadoTicket !== "CERRADO" && <ActionButtons
            onEdit={() => {
              handleEdit(ticket.numeroTicket)
            }} 
          />
          }

        </Flex>
        <Flex direction="column" mt="30px">
          <Text fontWeight="bold">Descripción: </Text>
          <Text>{ticket.descripcion}</Text>
        </Flex>
        <Flex overflow="auto" mt="2em">
          <Table colorScheme="teal">
            <Tbody>
              <Tr>
                <Td>
                  <InfoLabels titulo="Estado:" info={estadosTicket[ticket.estadoTicket]} />
                </Td>
                <Td>
                  <InfoLabels titulo="Tipo:" info={ticket.tipoTicket} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InfoLabels titulo="Producto:" info={ticket.versionProducto.producto.nombre} />
                </Td>
                <Td>
                  <InfoLabels titulo="Version:" info={ticket.versionProducto.versionProducto} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InfoLabels titulo="Cliente:" info={cliente['razon social']} />
                </Td>
                <Td>
                  <InfoLabels titulo="Recurso asignado:" info={empleado ? `${empleado.Nombre} ${empleado.Apellido}` : "-"} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InfoLabels titulo="Severidad" info={ severidad[ticket.severidadTicket]}/>
                </Td>
                <Td>
                <InfoLabels titulo="Dias SLA restantes" info={ getDiasRestantes(ticket.fechaCreacion, ticket.severidadTicket, ticket.estadoTicket)}/>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <InfoLabels titulo="Fecha de inicio:" info={parseDate(ticket.fechaCreacion)}/>
                </Td>
                <Td>
                  <InfoLabels titulo="Fecha de fin:" info={ ticket.fechaFinalizacion ? parseDate(ticket.fechaFinalizacion) : "-"}/>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    ) : (
      <Flex>
          <Heading>Hubo un error al buscar el ticket</Heading>
      </Flex>
    )
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
export default InfoTicket

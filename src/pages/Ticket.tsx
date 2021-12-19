
import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { soporteAPI,
  // proyectosAPI
} from '../axios'

import NuevaTareaButton from '../components/NuevaTareaButton'

import Ticket from '../models/Ticket'
import InfoTicket from '../components/InfoTicket'
import Empleado from '../models/Empleado'
import Cliente from '../models/Cliente'

const TicketView = () => {
  const [ticket, setTicket] = useState<Ticket>()
  const [empleado, setEmpleado] = useState<Empleado>()
  const [cliente, setCliente] = useState<Cliente>()
  // const [tareas, setTareas] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()


  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const ticket = await soporteAPI.get(`tickets/${id}`)
      setTicket(ticket.data)

      const cliente = await soporteAPI.get(`clientes/${ticket.data.idCliente}`)
      setCliente(cliente.data)

      if (ticket.data.legajoEmpleado){
        const empleado = await soporteAPI.get(`empleados/${ticket.data.legajoEmpleado}`)
        setEmpleado(empleado.data)
      }

      //TODO: get tareas
      // const tareas = await proyectosAPI.get(``)
      // setTareas(tareas.data.message)

      setLoading(false)
    }
    getData()
  }, [id])

  return (
    <>
      <InfoTicket
        ticket={ticket!}
        cliente={cliente!}
        empleado={empleado!}
        loading={loading} />
      <Flex alignItems="center" justifyContent="space-between" mt="50px">
        <Heading>Tareas</Heading>
        <NuevaTareaButton ticketId={id}></NuevaTareaButton>
      </Flex>
      <Heading size="md" textAlign="center" mt="3em">
        Este ticket no tiene tareas asociadas
      </Heading>
      {/* <ListadoTareas/> */}
    </>
  )
}

export default TicketView

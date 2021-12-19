import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { proyectosAPI, soporteAPI } from '../axios'

import AtrasButton from '../components/AtrasButton'
import ListadoTickets from '../components/ListadoTickets'
import PresentacionTarea from '../components/PresentacionTarea'

const Tarea = () => {
  const [tarea, setTarea] = useState<any>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [empleados, setEmpleados] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { idProyecto, idTarea } = useParams()

  useEffect(() => {
    const getTarea = async () => {
      setLoading(true)
      const res = await proyectosAPI.get(
        `/projects/${idProyecto}/tasks?taskId=${idTarea}`
      )
      setTarea(res.data.message[0])
      setLoading(false)
    }

    getTarea()
  }, [idProyecto, idTarea])

  useEffect(() => {
    const getTickets = async (ticketId: any) => {
      if (!ticketId) {
        return []
      }

      setLoading(true)
      const tickets = await soporteAPI.get(`/tickets/${ticketId}`)
      setTickets([tickets.data])
      setLoading(false)
    }

    getTickets(tarea.ticketIDs && tarea.ticketIDs[0])
  }, [tarea.ticketIDs])

  useEffect(() => {
    const getEmpleados = async () => {
      setLoading(true)
      const empleados = await soporteAPI.get('/empleados')
      setEmpleados(empleados.data)
      setLoading(false)
    }

    getEmpleados()
  }, [])

  return (
    <>
      <PresentacionTarea tarea={tarea} loading={loading} />
      <Flex alignItems="center" justifyContent="space-between" mt="50px">
        <Heading>Tickets</Heading>
      </Flex>
      <ListadoTickets
        tickets={tickets}
        empleados={empleados}
        loading={loading}
      />
      <Flex justifyContent="flex-end" mt="10px">
        <AtrasButton referencia={`/proyectos/${idProyecto}`} />
      </Flex>
    </>
  )
}

export default Tarea

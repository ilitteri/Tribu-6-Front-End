import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { soporteAPI } from '../axios'
import Empleado from '../models/Empleado'
import Ticket from '../models/Ticket'
import VersionProducto from '../models/VersionProducto'
import ListadoTickets from './ListadoTickets'
import NuevoTicketButton from './NuevoTicketButton'

const VisualizacionTickets = () => {

    const [tickets, setTickets] = useState<Ticket[]>([])
    const [version, setVersion] = useState<VersionProducto>()
    const [loading, setLoading] = useState(false)
    const [empleados, setEmpleados] = useState<Empleado[]>([])
    const params = useParams();

    useEffect(() => {

        const getData = async () => {
          setLoading(true)
          try {
            const version = await soporteAPI.get('/versiones-productos/' + params.idVersion);
            setVersion(version.data)

            const tickets = await soporteAPI.get('/tickets/producto/' + params.idVersion);
            setTickets(tickets.data)

            const empleados = await soporteAPI.get('/empleados');
            setEmpleados(empleados.data)

            setLoading(false)
          } catch {
            //handlear
            setLoading(false)
          }
        }
        getData()
      }, [params.idVersion])

      return <>
        <Flex alignItems="center" justifyContent="space-between">
            <Heading>Soporte</Heading>
            <NuevoTicketButton version = {params.idVersion}/>
        </Flex>
        {(version)?
        <Heading as='h3' size='lg' mt='1em'>{ version?.producto.nombre + " " + version?.versionProducto}</Heading>
        :<></>}
        <Flex overflow="auto">
          <ListadoTickets tickets={tickets} empleados={empleados} loading={loading}></ListadoTickets>
        </Flex>
        </>
}

export default VisualizacionTickets

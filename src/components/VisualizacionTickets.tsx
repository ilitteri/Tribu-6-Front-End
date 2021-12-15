import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { soporteAPI } from '../axios'
import ListadoTickets from './ListadoTickets'

const VisualizacionTickets = () => {

    const [tickets, setTickets] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [empleados, setEmpleados] = useState<any[]>([])
    const params = useParams();
    const {state} = useLocation();

    useEffect(() => {

        const getData = async () => {
          setLoading(true)
          try {
            const tickets = await soporteAPI.get('/tickets/producto/' + params.idVersion);
            const empleados = await soporteAPI.get('/empleados');
            setTickets(tickets.data)
            setEmpleados(empleados.data)
            setLoading(false)
          } catch {
            //handlear
            setLoading(false)
          }
        }
        getData()
      }, [])

      return <>
        <Flex alignItems="center" justifyContent="space-between">
            <Heading>Soporte</Heading>
        </Flex>
        {(state) ?
            <Heading as='h3' size='lg' mt='1em'>{ state.producto + " " + state.version}</Heading>
        : <></>}
            <Flex overflow="auto">
                <ListadoTickets tickets={tickets} empleados={empleados} loading={loading}></ListadoTickets>
            </Flex>
        </>
}

export default VisualizacionTickets

import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { soporteAPI } from '../axios'
import CreacionTicketForm from '../components/CreacionTicketForm'

const NuevoTicket = () => {
    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState<any[]>([])
    const [empleados, setEmpleados] = useState<any[]>([])
    const [clientes, setClientes] = useState<any[]>([])
    const [versiones, setVersiones] = useState<any[]>([])

    useEffect(() => {
      const getData = async () => {
        setLoading(true)
        try {
          const productos = await soporteAPI.get('/productos')
          const empleados = await soporteAPI.get('/empleados')
          const clientes = await soporteAPI.get('/clientes')
          const versiones = await soporteAPI.get('/versiones-productos')
          setProductos(productos.data)
          setEmpleados(empleados.data)
          setClientes(clientes.data)
          setVersiones(versiones.data)
          setLoading(false)
        } catch {
          //handlear
          setLoading(false)
        }
      }
    getData()
    }, [])

    return (
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Heading>Nuevo Ticket</Heading>
          </Flex>
          { <CreacionTicketForm
            productos={productos}
            empleados={empleados}
            clientes={clientes}
            versiones={versiones}
            loading={loading}></CreacionTicketForm> }
        </>
      )
}

export default NuevoTicket

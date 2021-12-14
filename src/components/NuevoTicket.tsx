import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { soporteAPI } from '../axios'

const NuevoTicket = () => {
    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState<any[]>([])
    const [empleados, setEmpleados] = useState<any[]>([])
    const [clientes, setClientes] = useState<any[]>([])

    useEffect(() => {
        const getData = async () => {
          setLoading(true)
          try {
            const productos = await soporteAPI.get('/productos')
            const empleados = await soporteAPI.get('/empleados')
            const clientes = await soporteAPI.get('/clientes')
            setProductos(productos.data)
            setEmpleados(empleados.data)
            setClientes(clientes.data)
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
            <Heading>Soporte</Heading>
          </Flex>
          {/* <NuevoTicketForm
            productos={productos}
            empleados={empleados}
            clientes={clientes}
            loading={loading}></NuevoTicketForm> */}
        </>
      )
}

export default NuevoTicket

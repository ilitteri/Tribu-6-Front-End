import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { soporteAPI } from '../axios'
import ListadoVersionesProductos from '../components/ListadoVersionesProductos'
import NuevoTicketButton from '../components/NuevoTicketButton'
import Producto from '../models/Producto'
import VersionProducto from '../models/VersionProducto'

const Soporte = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [versiones, setVersiones] = useState<VersionProducto[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProductos = async () => {
      setLoading(true)
      try {
        const productos = await soporteAPI.get('/productos')
        const versiones = await soporteAPI.get('/versiones-productos')
        setProductos(productos.data)
        setVersiones(versiones.data)
        setLoading(false)
      } catch {
        //handlear
        setLoading(false)
      }
    }
    getProductos()
  }, [])

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Soporte</Heading>
        {<NuevoTicketButton />}
      </Flex>
      <Heading as='h3' size='md' mt="0.5em">Productos</Heading>
      <Flex overflow="auto">
        <ListadoVersionesProductos productos={productos} versiones={versiones} loading={loading} />
      </Flex>
    </>
  )
}

export default Soporte

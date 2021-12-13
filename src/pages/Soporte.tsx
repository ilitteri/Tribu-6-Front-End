import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { soporteAPI } from '../axios'
import ListadoVersionesProductos from '../components/ListadoVersionesProductos'


const Soporte = () => {
  const [productos, setProductos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProductos = async () => {
      setLoading(true)
      try {
        const res = await soporteAPI.get('/productos')
        setProductos(res.data)
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
        {productos && productos.length > 0}
      </Flex>
      <Heading as='h3' size='md'>Productos</Heading>
      <Flex overflow="auto">
        <ListadoVersionesProductos productos={productos} loading={loading} />
      </Flex>
    </>
  )
}

export default Soporte

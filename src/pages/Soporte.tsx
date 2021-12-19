import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { soporteAPI } from '../axios'
import ListadoVersionesProductos from '../components/ListadoVersionesProductos'
import NuevoTicketButton from '../components/NuevoTicketButton'

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
        {<NuevoTicketButton />}
      </Flex>
      <Heading as='h3' size='md' mt="0.5em">Productos</Heading>
      <Flex overflow="auto">
        <ListadoVersionesProductos productos={productos} loading={loading} />
      </Flex>
    </>
  )
}

export default Soporte

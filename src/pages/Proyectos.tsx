import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'

import axios from '../axios'

import ListadoProyectos from '../components/ListadoProyectos'
import NuevoProyectoButton from '../components/NuevoProyectoButton'

const Proyectos = () => {
  const [proyectos, setProyectos] = useState<any[]>([])

  useEffect(() => {
    const getProyectos = async () => {
      const res = await axios.get('/projects')
      setProyectos(res.data.message)
    }
    getProyectos()
  }, [])

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Proyectos</Heading>
        {proyectos && proyectos.length > 0 && <NuevoProyectoButton />}
      </Flex>
      <Flex
        overflow="auto"
        mt="20px"
        justifyContent="center"
        alignItems="center"
      >
        <ListadoProyectos proyectos={proyectos} />
      </Flex>
    </>
  )
}

export default Proyectos

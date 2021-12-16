import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { proyectosAPI } from '../axios'

import ListadoTareas from '../components/ListadoTareas'
import NuevaTareaButton from '../components/NuevaTareaButton'
import PresentacionProyecto from '../components/PresentacionProyecto'
import Scroll from '../components/Scroll'

const Proyecto = () => {
  const [proyecto, setProyecto] = useState<any[]>([])
  const [tareas, setTareas] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  useEffect(() => {
    const getProyecto = async () => {
      setLoading(true)
      const res = await proyectosAPI.get(`projects?projectId=${id}`)
      setProyecto(res.data.message)
      setLoading(false)
    }
    
    const getTareas = async () => {
      setLoading(true)
      const res = await proyectosAPI.get(`/projects/${id}/tasks`)
      setTareas(res.data.message)
      setLoading(false)
    }
    getProyecto()
    getTareas()
  }, [])
  
  return(
    <>
      <Flex overflow="auto" mt="20px" alignItems="center">
        <PresentacionProyecto proyecto={proyecto} loading={loading}/>
      </Flex>
      <br />
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>Tareas</Heading>
        {tareas && tareas.length > 0 && <NuevaTareaButton />}
      </Flex>
      <Flex overflow="auto" mt="20px" alignItems="center">
        <ListadoTareas tareas={tareas} loading={loading} />
      </Flex>
    </>
  )
}

export default Proyecto

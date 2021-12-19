import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { proyectosAPI } from '../axios'

import ListadoTareas from '../components/ListadoTareas'
import NuevaTareaButton from '../components/NuevaTareaButton'
import AtrasButton from '../components/AtrasButton'
import PresentacionProyecto from '../components/PresentacionProyecto'

const Proyecto = () => {
  const [proyecto, setProyecto] = useState<any[]>([])
  const [tareas, setTareas] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

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
  }, [id])

  return (
    <>
      <PresentacionProyecto proyecto={proyecto} loading={loading} />
      <Flex alignItems="center" justifyContent="space-between" mt="50px">
        <Heading>Tareas</Heading>
        {tareas && tareas.length > 0 && (
          <NuevaTareaButton proyectoId={proyecto[0]?._id} />
        )}
      </Flex>
      <ListadoTareas
        proyectoId={proyecto[0]?._id}
        tareas={tareas}
        setTareas={setTareas}
        loading={loading}
      />
      <Flex justifyContent="flex-end" mt="10px">
        <AtrasButton referencia="/proyectos" />
      </Flex>
    </>
  )
}

export default Proyecto

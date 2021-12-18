import { Flex, Heading } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { proyectosAPI } from '../axios'

import AtrasButton from '../components/AtrasButton'
import PresentacionTarea from '../components/PresentacionTarea'

const Proyecto = () => {
  const [tarea, setTarea] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { idProyecto, idTarea } = useParams()

  useEffect(() => {
    const getTarea = async () => {
      setLoading(true)
      const res = await proyectosAPI.get(
        `/projects/${idProyecto}/tasks?taskId=${idTarea}`
      )
      setTarea(res.data.message)
      setLoading(false)
    }

    // const getTareas = async () => {
    //   setLoading(true)
    //   const res = await proyectosAPI.get(`/projects/${idProyecto}/tasks`)
    //   setTareas(res.data.message)
    //   setLoading(false)
    // }
    getTarea()
    // getTareas()
  }, [idProyecto, idTarea])

  return (
    <>
      <PresentacionTarea tarea={tarea} loading={loading} />
      <Flex alignItems="center" justifyContent="space-between" mt="50px">
        <Heading>Tickets</Heading>
      </Flex>
      {/* <ListadoTareas tareas={tareas} loading={loading} /> */}
      <Flex justifyContent="flex-end" mt="10px">
        <AtrasButton referencia={`/proyecto/${idProyecto}`} />
      </Flex>
    </>
  )
}

export default Proyecto

import {
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Spinner,
    Flex,
    useDisclosure,
    useToast,
    Heading,
  } from '@chakra-ui/react'

  import { useState } from 'react'
  import { useNavigate, useParams } from 'react-router-dom'

  import EmptyTareas from './EmptyTareas'
  import Scroll from '../components/Scroll'
  import ActionButtons from './ActionButtons'
  import AdvertenciaModal from './AdvertenciaModal'
  import { proyectosAPI } from '../axios'

  interface Tarea {
    _id: number
    nombre: string
    estado: string
    descripcion: string
    proyectoID: string
    empleadosResponsables: string[]
  }

  interface Props {
    tareas: Tarea[]
    setTareas: any
    loading: boolean
  }

  const ListadoTareas = ({ tareas, setTareas, loading }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const toast = useToast()
    const [tareaABorrar, setTareaABorrar] = useState<any>()

    const handleEdit = (proyectoId: any, tareaId: any) => {
      navigate(`/proyectos/${proyectoId}/${tareaId}/editar`)
    }

    const handleDelete = async (proyectoId: any, tareaId: any) => {
      try {
        await proyectosAPI.delete(`/projects/${proyectoId}/tasks/${tareaId}`)
        toast({
          title: 'Tarea borrada 👌',
          status: 'success',
          isClosable: true,
        })
        const { data } = await proyectosAPI.get(`/projects/${proyectoId}/tasks`)
        setTareas(data.message)
      } catch (err) {
        toast({
          title: 'Ocurrió un error al intentar borrar la tarea 😔',
          status: 'error',
          isClosable: true,
        })
      }
    }

    if (loading) {
      return (
        <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )
    }

    return tareas && tareas.length === 0 ? (
        <Heading>
            "No hay tareas asociadas a este ticket"
        </Heading>
    ) : (
      <>
        <Flex direction="column" width="100%">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th style={{ width: '49.5%' }}>Nombre</Th>
                <Th>Estado</Th>
              </Tr>
            </Thead>
          </Table>
          <Scroll>
            <Table variant="striped" colorScheme="teal">
              <Tbody>
                {tareas.map((tarea) => {
                  const ref = `/proyectos/${tarea.proyectoID}/${tarea._id}`
                  return (
                    <Tr>
                      <Td
                        cursor="pointer"
                        onClick={() => {
                          navigate(ref)
                        }}
                        style={{ width: '50%' }}
                      >
                        {tarea.nombre}
                      </Td>
                      <Td
                        cursor="pointer"
                        onClick={() => {
                          navigate(ref)
                        }}
                      >
                        {tarea.estado}
                      </Td>
                      <Td w="100px">
                        <ActionButtons
                          onDelete={() => {
                            setTareaABorrar(tarea)
                            onOpen()
                          }}
                          onEdit={() => {
                            handleEdit(tarea.proyectoID, tarea._id)
                          }}
                        />
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Scroll>
        </Flex>

        {tareaABorrar && (
          <AdvertenciaModal
            isOpen={isOpen}
            onClose={onClose}
            onDelete={() =>
              handleDelete(tareaABorrar.proyectoID, tareaABorrar._id)
            }
            proyecto={tareaABorrar}
            alertHeader="Borrar Tarea"
            alertBody={
              <>
                ¿Estás seguro que querés borrar{' '}
                <strong>{tareaABorrar.nombre}</strong> de forma permanente?
              </>
            }
          />
        )}
      </>
    )
  }

  export default ListadoTareas

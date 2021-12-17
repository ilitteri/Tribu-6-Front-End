import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  Flex,
  IconButton,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { proyectosAPI } from '../axios'
import EmptyProyectos from './EmptyProyectos'
import AdvertenciaModal from './AdvertenciaModal'

interface Proyecto {
  _id: number
  nombre: string
  tipo: string
  estado: string
  liderProyecto: string
}

interface Props {
  proyectos: Proyecto[]
  loading: boolean
  setProyectos: any
}

const ListadoProyectos = ({ proyectos, setProyectos, loading }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [proyectoABorrar, setProyectoABorrar] = useState<any>()
  const navigate = useNavigate()

  const handleEdit = (proyectoId: any) => {
    navigate(`/proyectos/${proyectoId}/editar`)
  }

  const handleDelete = async (proyectoId: any) => {
    try {
      await proyectosAPI.delete(`/projects/${proyectoId}`)
      toast({
        title: 'Proyecto borrado 👌',
        status: 'success',
        isClosable: true,
      })
      const { data } = await proyectosAPI.get('projects')
      setProyectos(data.message)
    } catch (err) {
      toast({
        title: 'Ocurrió un error al intentar borrar el proyecto 😔',
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

  return proyectos && proyectos.length === 0 ? (
    <EmptyProyectos />
  ) : (
    <>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Tipo</Th>
            <Th>Estado</Th>
            <Th>Líder</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proyectos.map((proyecto) => {
            return (
              <Tr>
                <Td>{proyecto.nombre}</Td>
                <Td>{proyecto.tipo}</Td>
                <Td>{proyecto.estado}</Td>
                <Td>{proyecto.liderProyecto}</Td>
                <Td w="100px">
                  <Flex justifyContent="center" alignItems="center">
                    <IconButton
                      aria-label="Borrar"
                      variant="outline"
                      icon={<FaTrashAlt />}
                      color="red.500"
                      mr="10px"
                      onClick={() => {
                        setProyectoABorrar(proyecto)
                        onOpen()
                      }}
                    />
                    <IconButton
                      aria-label="Editar"
                      variant="outline"
                      icon={<FaEdit />}
                      onClick={() => handleEdit(proyecto._id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {proyectoABorrar && (
        <AdvertenciaModal
          isOpen={isOpen}
          onClose={onClose}
          onDelete={() => handleDelete(proyectoABorrar._id)}
          proyecto={proyectoABorrar}
          alertHeader="Borrar Proyecto"
          alertBody={
            <>
              ¿Estás seguro que querés borrar{' '}
              <strong>{proyectoABorrar.nombre}</strong> de forma permanente?
            </>
          }
        />
      )}
    </>
  )
}

export default ListadoProyectos

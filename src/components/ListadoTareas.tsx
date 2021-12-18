import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  Flex,
} from '@chakra-ui/react'

import { useNavigate, useParams } from 'react-router-dom'

import EmptyTareas from './EmptyTareas'
import Scroll from '../components/Scroll'

interface Tarea {
  _id: number
  nombre: string
  estado: string
}

interface Props {
  tareas: Tarea[]
  loading: boolean
}

const ListadoTareas = ({ tareas, loading }: Props) => {
  const navigate = useNavigate()
  const { id } = useParams()
  if (loading) {
    return (
      <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    )
  }

  return tareas && tareas.length === 0 ? (
    <EmptyTareas />
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
                const ref = `/proyecto/${id}/${tarea._id}`
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
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Scroll>
      </Flex>
    </>
  )
}

export default ListadoTareas

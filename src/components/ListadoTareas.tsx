import {
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Spinner,
    Flex,
    calc,
  } from '@chakra-ui/react'
  
  import EmptyTareas from './EmptyTareas'
  import Scroll from '../components/Scroll'

  interface Tarea {
    id: number
    nombre: string
    estado: string
  }
  
  interface Props {
    tareas: Tarea[]
    loading: boolean
  }
  
  const ListadoTareas = ({ tareas, loading }: Props) => {
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
      <Flex direction="column" style={{width:"100%"}}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th style={{width: "49.5%"}}>Nombre</Th>
              <Th>Estado</Th>
            </Tr>
          </Thead>
        </Table>
        <Scroll>
          <Table variant="striped" colorScheme="teal">
            <Tbody>
              {tareas.map((tarea) => {
                return (
                  <Tr>
                    <Td style={{width: "50%"}}>{tarea.nombre}</Td>
                    <Td >{tarea.estado}</Td>
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
  
import { Table, Thead, Tr, Th, Tbody, Td, Spinner } from '@chakra-ui/react'

import EmptyProyectos from './EmptyProyectos'

interface Proyecto {
  id: number
  nombre: string
  tipo: string
  estado: string
  liderProyecto: string
}

interface Props {
  proyectos: Proyecto[]
  loading: boolean
}

const ListadoProyectos = ({ proyectos, loading }: Props) => {
  if (loading) {
    return <Spinner />
  }

  return proyectos && proyectos.length === 0 ? (
    <EmptyProyectos />
  ) : (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Tipo</Th>
          <Th>Estado</Th>
          <Th>Líder</Th>
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
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default ListadoProyectos

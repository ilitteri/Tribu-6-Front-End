import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'

import EmptyProyectos from './EmptyProyectos'

interface Proyecto {
  id: number
  nombre: string
  tipo: string
  estado: string
  liderProyecto: string
}

const ListadoProyectos = ({ proyectos }: { proyectos: Proyecto[] }) => {
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

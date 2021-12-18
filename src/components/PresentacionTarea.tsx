import {
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  Flex,
  Heading,
  Box,
} from '@chakra-ui/react'

import Scroll from '../components/Scroll'

interface Tarea {
  _id: number
  nombre: string
  estado: string
  descripcion: string
  empleadosResponsables: string[]
}

interface Props {
  tarea: Tarea[]
  loading: boolean
}

const InfoLabels = ({ titulo, info }: any) => {
  return (
    <Flex>
      <Text fontWeight="bold" mr="5px">
        {titulo}
      </Text>
      <Text>{info}</Text>
    </Flex>
  )
}
const PresentacionTarea = ({ tarea, loading }: Props) => {
  if (loading) {
    return (
      <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    )
  }

  return tarea && tarea.length !== 0 ? (
    <Flex Flex direction="column" justifyContent="flex-start">
      <Heading>{tarea[0].nombre}</Heading>
      <InfoLabels titulo="Estado:" info={tarea[0].estado} />
      <Flex direction="column" justifyContent="flex-end" alignItems="flex-end">
        <InfoLabels titulo="Empleados Responsables" />
        <Box overflowY="auto" maxHeight="150px">
          <Table variant="striped" colorScheme="teal" w="200px">
            <Thead position="sticky" top={0} bgColor="#ecf3f7">
              <Tr>
                <Th>Nombre</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tarea[0].empleadosResponsables.map((empleado) => {
                return (
                  <Tr>
                    <Td>{empleado}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Flex>
  ) : (
    <div></div>
  )
}

export default PresentacionTarea

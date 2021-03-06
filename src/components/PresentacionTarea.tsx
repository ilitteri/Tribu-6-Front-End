import {
  Text,
  Table,
  Tr,
  Tbody,
  Td,
  Spinner,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'

import ActionButtons from './ActionButtons'

interface Tarea {
  _id: number
  nombre: string
  estado: string
  descripcion: string
  proyectoID: string
  empleadosResponsables: string[]
}

interface Props {
  tarea: Tarea
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
  const navigate = useNavigate()
  if (loading) {
    return (
      <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    )
  }

  const handleEdit = (proyectoId: any, tareaId: any) => {
    navigate(`/proyectos/${proyectoId}/${tareaId}/editar`)
  }

  return tarea ? (
    <Flex Flex direction="column" justifyContent="flex-start">
      <Flex>
        <Heading mr={5}>{tarea.nombre}</Heading>
        <ActionButtons
          onEdit={() => {
            handleEdit(tarea.proyectoID, tarea._id)
          }}
        />
      </Flex>
      <Flex direction="column" mt="30px">
        <Text fontWeight="bold">Descripción: </Text>
        <Text>{tarea.descripcion || 'No hay descripción.'}</Text>
      </Flex>
      <Flex overflow="auto" mt="10px">
        <Table colorScheme="teal">
          <Tbody>
            <Tr>
              <Td>
                <InfoLabels titulo="Estado:" info={tarea.estado} />
              </Td>
              <Td>
                <InfoLabels
                  titulo="Empleado responsable:"
                  info={
                    (tarea.empleadosResponsables &&
                      tarea.empleadosResponsables[0]) ||
                    'Sin asignar'
                  }
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  ) : (
    <div></div>
  )
}

export default PresentacionTarea

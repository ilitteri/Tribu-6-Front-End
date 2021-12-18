import {
  Spinner,
  Flex,
  Heading,
  Text,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import ActionButtons from './ActionButtons'

import EmptyProyectos from './EmptyProyectos'

interface Proyecto {
  _id: number
  nombre: string
  estado: string
  descripcion: string
  liderProyecto: string
  tipo: string
  fechaInicio: string
  fechaFin: string
}

interface Props {
  proyecto: Proyecto[]
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

const PresentacionProyecto = ({ proyecto, loading }: Props) => {
  const navigate = useNavigate()

  const handleEdit = (proyectoId: any) => {
    navigate(`/proyectos/${proyectoId}/editar`)
  }

  if (loading) {
    return (
      <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    )
  }

  console.log(proyecto)

  return proyecto && proyecto.length !== 0 ? (
    <Flex direction="column" justifyContent="flex-start">
      <Flex>
        <Heading mr={5}>{proyecto[0].nombre}</Heading>
        <ActionButtons
          onEdit={() => {
            handleEdit(proyecto[0]._id)
          }}
        />
      </Flex>
      <Flex overflow="auto" mt="10px">
        <Table colorScheme="teal">
          <Tbody>
            <Tr>
              <Td>
                <InfoLabels titulo="Estado:" info={proyecto[0].estado} />
              </Td>
              <Td>
                <InfoLabels titulo="Tipo:" info={proyecto[0].tipo} />
              </Td>
              <Td>
                <InfoLabels titulo="Líder:" info={proyecto[0].liderProyecto} />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <InfoLabels
                  titulo="Fecha de inicio:"
                  info={dateFromISO(proyecto[0].fechaInicio)}
                />
              </Td>
              <Td>
                <InfoLabels
                  titulo="Fecha de fin:"
                  info={dateFromISO(proyecto[0].fechaFin)}
                />
              </Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
      <Flex direction="column" mt="30px">
        <Text fontWeight="bold">Descripción: </Text>
        <Text>{proyecto[0].descripcion}</Text>
      </Flex>
    </Flex>
  ) : (
    <EmptyProyectos />
  )
}

function dateFromISO(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
    hour12: false,
    timeZone: undefined,
  })
}

export default PresentacionProyecto

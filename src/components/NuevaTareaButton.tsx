import { Button } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'
import { createSearchParams, useNavigate } from 'react-router-dom'

const NuevaTareaButton = ({ proyectoId, ticketId }: any) => {
  const navigate = useNavigate()

  const searchParams = proyectoId
    ? `?${createSearchParams({
        proyectoId: proyectoId,
      })}`
    : ''

  return (
    <Button
      leftIcon={<GoPlus />}
      colorScheme="teal"
      variant="solid"
      onClick={() =>
        navigate({
          pathname: '/tarea/nuevo',
          search: searchParams,
        })
      }
    >
      Nueva Tarea
    </Button>
  )
}

export default NuevaTareaButton

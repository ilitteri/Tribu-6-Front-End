import { Button } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'
import { createSearchParams, useNavigate } from 'react-router-dom'

const NuevoTicketButton = ( params: any ) => {
  const navigate = useNavigate()

  const searchParams = params.version
  ? `?${createSearchParams({
    versionId: params.version,
    })}`
  : ''

  return (
    <Button
      onClick={() => navigate({
        pathname: '/soporte/nuevo',
        search: searchParams,
      })}
      leftIcon={<GoPlus />}
      colorScheme="teal"
      variant="solid"
    >
      Crear Ticket
    </Button>
  )
}

export default NuevoTicketButton

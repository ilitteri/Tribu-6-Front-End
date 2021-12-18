import { Button } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const NuevoTicketButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate('/soporte/nuevo')}
      leftIcon={<GoPlus />}
      colorScheme="teal"
      variant="solid"
    >
      Crear Ticket
    </Button>
  )
}

export default NuevoTicketButton

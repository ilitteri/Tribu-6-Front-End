import { Button } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'

const NuevoTicketButton = () => {
  return (
    // Agregar redirect a nuevoTicket
    <Button leftIcon={<GoPlus />} colorScheme="teal" variant="solid">
      Nuevo Ticket
    </Button>
  )
}

export default NuevoTicketButton

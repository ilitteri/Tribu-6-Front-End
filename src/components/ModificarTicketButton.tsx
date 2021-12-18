import { Button } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'


interface Props{
  ticketID: number
}


const ModificarTicketButton = ({ticketID}: Props) => {
  const navigate = useNavigate()


  return (
    <Button
      onClick={() => navigate(`/soporte/ticket/${ticketID}`)}
      leftIcon={<GoPlus />}
      colorScheme="teal"
      variant="solid"
    >
      Modificar Ticket
    </Button>
  )
}

export default ModificarTicketButton
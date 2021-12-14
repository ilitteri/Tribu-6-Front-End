import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'

const NuevoProyectoButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate('nuevo')}
      leftIcon={<GoPlus />}
      colorScheme="teal"
      variant="solid"
    >
      Nuevo Proyecto
    </Button>
  )
}

export default NuevoProyectoButton

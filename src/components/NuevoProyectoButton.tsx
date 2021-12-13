import { Button } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'

const NuevoProyectoButton = () => {
  return (
    <Button leftIcon={<GoPlus />} colorScheme="teal" variant="solid">
      Nuevo Proyecto
    </Button>
  )
}

export default NuevoProyectoButton

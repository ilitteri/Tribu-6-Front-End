import { Button } from '@chakra-ui/react'
import { GoPlus } from 'react-icons/go'

const NuevaTareaButton = () => {
  return (
    <Button leftIcon={<GoPlus />} colorScheme="teal" variant="solid">
      Nueva Tarea
    </Button>
  )
}

export default NuevaTareaButton
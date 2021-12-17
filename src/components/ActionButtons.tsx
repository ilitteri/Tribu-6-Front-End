import { IconButton } from '@chakra-ui/button'
import { Flex } from '@chakra-ui/layout'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

const ActionButtons = ({ onDelete, onEdit }: any) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <IconButton
        aria-label="Borrar"
        variant="outline"
        icon={<FaTrashAlt />}
        color="red.500"
        mr="10px"
        onClick={onDelete}
      />
      <IconButton
        aria-label="Editar"
        variant="outline"
        icon={<FaEdit />}
        onClick={onEdit}
      />
    </Flex>
  )
}

export default ActionButtons

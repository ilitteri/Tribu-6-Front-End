import { IconButton } from '@chakra-ui/button'
import { Flex } from '@chakra-ui/layout'
import { Tooltip } from '@chakra-ui/react'
import { FaTrashAlt, FaEdit, FaTimes} from 'react-icons/fa'


const ActionButtons = ({ onDelete, onEdit, onCloseTicket }: any) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      {onDelete && (
        <Tooltip hasArrow label="Borrar">
          <IconButton
            aria-label="Borrar"
            variant="outline"
            icon={<FaTrashAlt />}
            color="red.500"
            mr="10px"
            onClick={onDelete}
          />
        </Tooltip>
      )}
      <Tooltip hasArrow label="Editar">
        <IconButton
          aria-label="Editar"
          variant="outline"
          icon={<FaEdit />}
          onClick={onEdit}
        />
      </Tooltip>
      {onCloseTicket && (
      <Tooltip hasArrow label="Cerrar">
        <IconButton
          aria-label="Cerrar"
          variant="outline"
          icon={<FaTimes />}
          onClick={onCloseTicket}
        />
      </Tooltip>)}

    </Flex>
  )
}

export default ActionButtons

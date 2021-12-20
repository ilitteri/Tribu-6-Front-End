import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
  } from '@chakra-ui/modal'
  import { Button } from '@chakra-ui/react'
  import { useRef } from 'react'

  const ConfirmarCierreTicketModal = ({
    isOpen,
    onClose,
    onConfirm,
    alertHeader,
    alertBody,
  }: any) => {
    const cancelRef = useRef(null)

    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        size="lg"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {alertHeader}
            </AlertDialogHeader>

            <AlertDialogBody>{alertBody}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                    onConfirm()
                    onClose()
                }}
                ml={3}
              >
                Cerrar Ticket
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
  }

  export default ConfirmarCierreTicketModal

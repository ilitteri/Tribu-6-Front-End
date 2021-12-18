import { Heading, Flex } from '@chakra-ui/react'

import NuevaTareaButton from './NuevaTareaButton'

const EmptyTareas = ({ proyectoId }: any) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      mt="150px"
      p="5px"
      w="100%"
    >
      <Heading size="lg" mb="20px">
        Todavía no hay tareas creadas. ¡Creá una!
      </Heading>
      <NuevaTareaButton proyectoId={proyectoId} />
    </Flex>
  )
}

export default EmptyTareas

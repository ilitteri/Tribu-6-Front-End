import { Heading, Flex } from '@chakra-ui/react'

import NuevoProyectoButton from './NuevoProyectoButton'

const EmptyProyectos = () => {
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
        Todavía no hay proyectos creados. ¡Creá uno!
      </Heading>
      <NuevoProyectoButton />
    </Flex>
  )
}

export default EmptyProyectos

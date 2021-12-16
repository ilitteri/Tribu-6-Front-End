import { Flex, Heading } from '@chakra-ui/layout'

const Inicio = () => {

  return (
    <>
      <Flex>
        <Heading>Página principal</Heading>
      </Flex>
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
          Bienvenido/a a PSA.
        </Heading>
        <Heading size="lg" mb="20px">
          Elija uno de los módulos en la barra de navegación para empezar a gestionar.
        </Heading>
      </Flex>
    </>
  )
}

export default Inicio


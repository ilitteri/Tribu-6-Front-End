import { ChakraProvider, theme } from '@chakra-ui/react'

import Sidebar from '../components/SidebarNav'
import ListadoProyectos from '../components/ListadoProyectos'

const Proyectos = () => {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>
        <ListadoProyectos />
      </Sidebar>
    </ChakraProvider>
  )
}

export default Proyectos

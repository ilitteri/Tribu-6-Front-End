import * as React from 'react'
import { ChakraProvider, Box, theme } from '@chakra-ui/react'
import Sidebar from './components/SidebarNav'
import ListadoProyectos from './components/ListadoProyectos'

const App = () => (
  <ChakraProvider theme={theme}>
    <Sidebar>
      <Box textAlign="center" fontSize="xl">
        <ListadoProyectos />
      </Box>
    </Sidebar>
  </ChakraProvider>
)

export default App

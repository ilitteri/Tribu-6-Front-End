import * as React from 'react'
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import Sidebar from './components/SidebarNav/SidebarNav'
import LogoPsa from './components/LogoPsa'
import ListadoProyectos from './components/ListadoProyectos'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Sidebar>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <LogoPsa />
        </Grid>

        <ListadoProyectos />
      </Box>
    </Sidebar>
  </ChakraProvider>
)

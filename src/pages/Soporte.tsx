import { ChakraProvider, theme } from '@chakra-ui/react'

import Sidebar from '../components/SidebarNav'

const Soporte = () => {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>
        <h1>Soporte</h1>
      </Sidebar>
    </ChakraProvider>
  )
}

export default Soporte

import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'

import Sidebar from './components/SidebarNav'

import Proyectos from './pages/Proyectos'
import Soporte from './pages/Soporte'
import NuevoTicket from './components/NuevoTicket'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Proyectos />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/soporte/nuevo" element={<NuevoTicket />} />
        </Routes>
      </Sidebar>
    </ChakraProvider>
  )
}

export default App

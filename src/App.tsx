import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'

import Sidebar from './components/SidebarNav'

import Proyectos from './pages/Proyectos'
import Soporte from './pages/Soporte'
import CreacionProyectos from './pages/CreacionProyectos'
import Inicio from './pages/Inicio'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyectos/nuevo" element={<CreacionProyectos />} />
          <Route path="/soporte" element={<Soporte />} />
        </Routes>
      </Sidebar>
    </ChakraProvider>
  )
}

export default App

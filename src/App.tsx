import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'

import Sidebar from './components/SidebarNav'

import Proyectos from './pages/Proyectos'
import Proyecto from './pages/Proyecto'
import Tarea from './pages/Tarea'
import Soporte from './pages/Soporte'
import Inicio from './pages/Inicio'
import VisualizacionTickets from './components/VisualizacionTickets'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyecto/:id" element={<Proyecto />} />
          <Route path="/proyecto/:idProyecto/:idTarea" element={<Tarea />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route
            path="/soporte/tickets/:idVersion"
            element={<VisualizacionTickets />}
          />
        </Routes>
      </Sidebar>
    </ChakraProvider>
  )
}

export default App

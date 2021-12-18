import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'

import Sidebar from './components/SidebarNav'

import Proyectos from './pages/Proyectos'
import Proyecto from './pages/Proyecto'
import Tarea from './pages/Tarea'
import Soporte from './pages/Soporte'
import CreacionProyectos from './pages/CreacionProyectos'
import CreacionTareas from './pages/CreacionTareas'
import Inicio from './pages/Inicio'
import VisualizacionTickets from './components/VisualizacionTickets'
import ModificacionProyectos from './pages/ModificacionProyectos'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyectos/:id" element={<Proyecto />} />
          <Route
            path="/proyectos/:id/editar"
            element={<ModificacionProyectos />}
          />
          <Route path="/proyectos/nuevo" element={<CreacionProyectos />} />
          <Route path="/proyectos/:idProyecto/:idTarea" element={<Tarea />} />
          <Route path="/tarea/nuevo" element={<CreacionTareas />} />
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

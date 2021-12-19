import { Routes, Route } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'

import Sidebar from './components/SidebarNav'

import Inicio from './pages/Inicio'
import Proyectos from './pages/Proyectos'
import Proyecto from './pages/Proyecto'
import CreacionProyectos from './pages/CreacionProyectos'
import ModificacionProyectos from './pages/ModificacionProyectos'
import Tarea from './pages/Tarea'
import CreacionTareas from './pages/CreacionTareas'
import ModificacionTareas from './pages/ModificacionTareas'

import Soporte from './pages/Soporte'
import NuevoTicket from './components/NuevoTicket'
import VisualizacionTicketsVersion from './components/VisualizacionTicketsVersion'
import TicketView from './pages/Ticket'

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
          <Route
            path="/proyectos/:idProyecto/:idTarea/editar"
            element={<ModificacionTareas />}
          />

          <Route path="/soporte" element={<Soporte />} />
          <Route path="/soporte/tickets/:idVersion" element={<VisualizacionTicketsVersion />}/>
          <Route path="/soporte/ticket/:id" element={<TicketView />}/>
          <Route path="/soporte/nuevo" element={<NuevoTicket />} />
        </Routes>
      </Sidebar>
    </ChakraProvider>
  )
}

export default App

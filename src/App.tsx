import { Routes, Route } from 'react-router-dom'

import Proyectos from './pages/Proyectos'
import Soporte from './pages/Soporte'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Proyectos />} />
      <Route path="/proyectos" element={<Proyectos />} />
      <Route path="/soporte" element={<Soporte />} />
    </Routes>
  )
}

export default App

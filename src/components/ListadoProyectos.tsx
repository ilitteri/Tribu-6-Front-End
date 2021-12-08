import React, { useState, useEffect } from 'react'
import axios from '../axios'

interface Proyecto {
  nombre: number
}

const ListadoProyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])

  useEffect(() => {
    const getProyectos = async () => {
      const res = await axios.get('/proyectos')
      console.log('RES: ', res)
      setProyectos(res.data.message)
    }
    getProyectos()
  }, [])

  return (
    <>
      {proyectos ? (
        proyectos.map((proyecto) => {
          return <h2>{proyecto.nombre}</h2>
        })
      ) : (
        <h2>Todavía no hay proyectos creados.</h2>
      )}
    </>
  )
}

export default ListadoProyectos

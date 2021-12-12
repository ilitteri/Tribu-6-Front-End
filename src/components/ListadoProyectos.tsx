import { useState, useEffect } from 'react';
import axios from '../axios';

interface Proyecto {
  id: number;
  nombre: string;
}

const ListadoProyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    const getProyectos = async () => {
      const res = await axios.get('/projects');
      console.log('RES: ', res);
      setProyectos(res.data.message);
    };
    getProyectos();
  }, []);

  return (
    <>
      {proyectos ? (
        proyectos.map((proyecto) => (
          <h2 key={proyecto.id}>{proyecto.nombre}</h2>
        ))
      ) : (
        <h2>Todavía no hay proyectos creados.</h2>
      )}
    </>
  );
};

export default ListadoProyectos;

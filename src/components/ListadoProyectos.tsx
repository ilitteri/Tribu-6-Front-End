import React, { useState, useEffect } from 'react'
import axios from '../axios'

const ListadoProyectos = () => {
	const [proyectos, setProyectos] = useState([])

	useEffect(() => {
		const getProyectos = async () => {
			const res = await axios.get("/proyectos")
			console.log("RES: ", res)
			setProyectos(res.data.message) // ?
		}
		getProyectos()
	}, [])

	return (
		<>
		{proyectos.map(proyectos => {
			return <h2>proyectos.nombre</h2>
		})}
		</>
	)
}

export default ListadoProyectos

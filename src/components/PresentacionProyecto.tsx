import {
    Spinner,
    Flex,
    Heading,
    Container,
} from '@chakra-ui/react'

import EmptyProyectos from './EmptyProyectos'

interface Proyecto {
    _id: number
    nombre: string
    estado: string
    descripcion: string
    liderProyecto: string
    tipo: string
    fechaInicio: Date
    fechaFin: Date
}

interface Props {
    proyecto: Proyecto[]
    loading: boolean
}

const PresentacionProyecto = ({ proyecto, loading }: Props) => {
    if (loading) {
        return (
        <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
            <Spinner />
        </Flex>
        )
    }

    console.log(proyecto)

    return proyecto && proyecto.length !== 0?(
        <Flex direction="column">
            <Heading>{proyecto[0].nombre}</Heading>
            <Container>
                Descripcion: {proyecto[0].descripcion}
            </Container>
            <Container>
                Lider de Proyecto: {proyecto[0].liderProyecto}
            </Container>
            <Container>
                Fecha de inicio: {proyecto[0].fechaInicio}
            </Container>
            <Container>
                Fecha de Fin: {proyecto[0].fechaFin}
            </Container>
        </Flex>    
    ):(
        <EmptyProyectos/>
    )
}

export default PresentacionProyecto

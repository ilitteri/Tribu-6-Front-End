import {
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Spinner,
    Flex,
    Heading,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Producto from '../models/Producto';

interface Props {
    productos: Producto[]
    loading: boolean
}

function parseDate(fechaLanzamiento: Date): string {
    return new Date(fechaLanzamiento).toLocaleDateString("Fr");
}

const ListadoVersionesProductos = ({ productos, loading }: Props) => {

    const navigate = useNavigate()

    if (loading) {
        return (
            <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
                <Spinner />
            </Flex>
        )
    }

    return productos && productos.length === 0 ? (
        <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
            <Heading as='h2' size='lg' mt="5vh">
                No hay productos en el sistema.
            </Heading>
        </Flex>
    ) : (
        <Flex width="100%" direction="column">
        {productos.map((producto) => {
            return (
            <Flex direction="column" mt="4vh">
                <Heading as='h2' size='lg'>{producto.nombre}</Heading>
                { producto.versionesProducto && producto.versionesProducto.length === 0 ? (
                <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
                    <Heading as='h3' size='md' mt="5vh">
                        No hay versiones en el sistema para este producto.
                    </Heading>
                </Flex>
            ) : (
                <Table mt="2vh" variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Versión</Th>
                            <Th>Fecha de Lanzamiento</Th>
                        </Tr>
                    </Thead>
                    <Tbody text-align="center">
                        {producto.versionesProducto.map((version) => {
                            return (
                            <Tr
                            _hover={{
                                fontWeight: 'bold'
                            }}
                            cursor="pointer" onClick={() => navigate('tickets/' + version.id, { state: {producto: producto.nombre, version: version.versionProducto} } )}>
                                <Td width="50%">{version.versionProducto}</Td>
                                <Td>{parseDate(version.fechaLanzamiento)}</Td>
                            </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
                )}
            </Flex>
            )
        })}
        </Flex>
    )
}

export default ListadoVersionesProductos

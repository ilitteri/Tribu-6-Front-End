import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Select,
    Stack,
    Textarea,
    useColorModeValue,
    useToast,
    FormErrorMessage,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
  import { useForm } from 'react-hook-form'
  import { useNavigate } from 'react-router-dom'

  import { soporteAPI } from '../axios'


  //productos: any,empleados: any,clientes: any
  // TODO: agregar validaciones

interface Producto {
    id: number,
    nombre: string,
    versionesProducto: Array<VersionProducto>
}

interface VersionProducto {
    id: number,
    versionProducto: string,
    fechaLanzamiento: Date
}

  const CreacionTicketForm = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (ticket: any) => {
      try {
        await soporteAPI.post('/tickets', ticket)  // ¿esta bien esto? me tiraba error y de repente pasó
        toast({
          title: 'Ticket creado',
          status: 'success',
          isClosable: true,
        })
        navigate('/soporte')
      } catch (err) {
        toast({
          title: 'Ocurrió un error al intentar crear el ticket ',
          status: 'error',
          isClosable: true,
        })
      }
    }

    const [loading, setLoading] = useState(false)
    const [productos, setProductos] = useState<Producto[]>([])
    const [empleados, setEmpleados] = useState<any[]>([])
    const [clientes, setClientes] = useState<any[]>([])
    const [productoSeleccionado, setProductoSeleccionado] = useState<any>()

    function setProducto(index: number){
      setProductoSeleccionado(productos[index])
    }
    useEffect(() => {
      const getData = async () => {
        setLoading(true)
        try {
          const productos = await soporteAPI.get('/productos')
          const empleados = await soporteAPI.get('/empleados')
          const clientes = await soporteAPI.get('/clientes')
          setProductos(productos.data)
          setEmpleados(empleados.data)
          setClientes(clientes.data)
          setLoading(false)
        } catch {
          //handlear
          setLoading(false)
        }
      }
    getData()
    }, [])

    return (
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p="20px"
        rounded="md"
        mt="20px"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl htmlFor="Titulo" isRequired isInvalid={errors?.Titulo}>
              <FormLabel>Titulo del ticket</FormLabel>
              <Input
                id="Titulo"
                placeholder="Titulo"
                {...register('titulo', {
                  required: 'No se puede crear un ticket sin titulo',
                })}
              />
              <FormErrorMessage>{errors?.Titulo?.message}</FormErrorMessage>
            </FormControl>

            <FormControl htmlFor="descripcion" isRequired isInvalid={errors?.descripcion}>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                id="descripcion"
                placeholder="Agregá una descripción del Ticket"
                {...register('descripcion', {
                    required: 'No se puede crear un ticket sin la descripcion',
                })}
              />
              <FormErrorMessage>{errors?.descripcion?.message}</FormErrorMessage>
            </FormControl>

            <HStack>

              <FormControl
                htmlFor="Productos" isRequired
                isInvalid={errors?.Productos}
              >
                <FormLabel>Productos</FormLabel>
                <Select
                  id="Productos"
                  placeholder="Seleccionar producto"
                  onChange={(e) => setProducto(parseInt(e.target.value))}>
                  {productos.map((producto, index) => {
                    return <option value={index}>{producto.nombre}</option>
                  })}

                </Select>
                <FormErrorMessage>
                  {errors?.Productos?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                htmlFor="Version" isRequired
                isInvalid={errors?.Version}
              >
                <FormLabel>Version</FormLabel>
                <Select
                  disabled={productoSeleccionado ? undefined : true}
                  id="Version"
                  placeholder="Seleccionar Version del producto"
                  {...register('idVersionProducto', {
                    required: 'Debe seleccionar una version',
                })}
                >
                {productoSeleccionado ? productoSeleccionado.versionesProducto.map((version : VersionProducto) => {
                    return <option value = {version.id}>{version.versionProducto}</option>
                  }) : ""}
                </Select>
                <FormErrorMessage>
                  {errors?.Version?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>

            <HStack>
              <FormControl
                htmlFor="Cliente" isRequired
                isInvalid={errors?.Cliente}
              >
                <FormLabel>Cliente</FormLabel>
                {/* TODO: obtener los clientes de la api */}
                <Select
                  id="Cliente"
                  placeholder="Seleccionar Cliente"
                  {...register('idCliente', {
                    required: 'Debe seleccionar un cliente',
                })}
                >
                  {clientes.map((clientes) => {
                    //return <p>productos.nombre</p>
                    return <option value = {clientes.id}>{clientes["razon social"]}</option>
                  })}
                </Select>
                <FormErrorMessage>
                  {errors?.Cliente?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                htmlFor="Persona"
                isInvalid={errors?.Persona}
              >
                <FormLabel>Persona asignada</FormLabel>
                <Select
                  id="persona"
                  placeholder="Seleccionar la persona asignada al ticket"
                  {...register('legajoEmpleado')}
                >
                  {empleados.map((empleados) => {
                    return <option value = {empleados.id}>{empleados.Nombre + " " + empleados.Apellido}</option>
                  })}
                </Select>
                <FormErrorMessage>
                  {errors?.persona?.message}
                </FormErrorMessage>
              </FormControl>
              </HStack>


              <HStack>
              <FormControl htmlFor="tipo" isRequired isInvalid={errors?.tipo}>
                <FormLabel>Tipo de ticket</FormLabel>
                <Select
                  id="tipoDeTitipocket"
                  placeholder="Tipo de Ticket"
                  {...register('tipoTicket', {
                    required: 'Debe seleccionar un tipo de ticket',
                })}
                >
                  <option value ={"CONSULTA"} >Consulta</option>
                  <option  value = {"INCIDENCIA"}>Incidencia</option>
                </Select>
                <FormErrorMessage>{errors?.tipo?.message}</FormErrorMessage>
              </FormControl>

              <FormControl htmlFor="Severidad" isRequired isInvalid={errors?.tipo}>
                <FormLabel>Severidad</FormLabel>
                <Select
                  id="Severidad"
                  placeholder="Seleccionar severidad del ticket"
                  {...register('severidadTicket', {
                    required: 'Debe seleccionar una severidad',
                })}
                >
                  {/* Habria que configurar que al ser un ticket de consulta no deje poner la severidad */}
                  <option>S1</option>
                  <option>S2</option>
                  <option>S3</option>
                  <option>S4</option>
                </Select>
                <FormErrorMessage>{errors?.Severidad?.message}</FormErrorMessage>
              </FormControl>
              </HStack>

            <Flex w="100%" justifyContent="end">
              <ButtonGroup spacing="6">
                <Button
                  onClick={() => navigate('/proyectos')}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                  Crear Ticket
                </Button>
              </ButtonGroup>
            </Flex>
          </Stack>
        </form>
      </Box>
    )
  }

export default CreacionTicketForm

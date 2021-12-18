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
  Heading,
} from '@chakra-ui/react'
  
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaTicketAlt } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import { soporteAPI } from '../axios'


interface Ticket {
  titulo: string,
  descripcion: string,
  fechaCreacion: Date,
  fechaFinalizacion: Date,
  severidadTicket: string,
  legajoEmpleado: number,
  idCliente: number,
  idVersionProducto: number
  versionProducto: string
  tipoTicket: string
}

interface Cliente {
  'razon social': string 
}

interface Empleado {
  Apellido: string,
  Nombre: string,
  id: number,
  legajo: number
}

const ModificarTicketForm = () => {
  const navigate = useNavigate()
    const toast = useToast()
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm()

  let params = useParams();
  console.log(params);

  const onSubmit = async (ticket: any) => {
    try {
      await soporteAPI.patch('/tickets', ticket) 
      toast({
        title: 'Ticket modificado',
        status: 'success',
        isClosable: true,
      })
      navigate('/tickets')
    } catch (err) {
      toast({
        title: 'Ocurrió un error al intentar modificar el ticket ',
        status: 'error',
        isClosable: true,
      })
    }
  }
  

  const [loading, setLoading] = useState(false)
  const [ticket,setTicket] = useState<Ticket>()
  const [productos, setProductos] = useState<any[]>([])
  const [empleados, setEmpleados] = useState<any[]>([])
  const [empleado, setEmpleado] = useState<Empleado>()
  const [clientes, setClientes] = useState<any[]>([])
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const productos = await soporteAPI.get('/productos')
        const empleados = await soporteAPI.get('/empleados')
        const clientes = await soporteAPI.get('/clientes')
        const ticket = await soporteAPI.get('/tickets/'+ params.id)
        const empleado = await soporteAPI.get('/empleados/'+ ticket.data.legajoEmpleado)
        setProductos(productos.data)
        setEmpleados(empleados.data)
        setClientes(clientes.data)
        setLoading(false)
        setTicket(ticket.data)
      } catch {
        //handlear
        setLoading(false)
      }
    }
  getData()
  }, [params.idVersion])

  function getNombreEmpleado(legajoEmpleado: number|undefined ): string {
    var empleadoEncontrado = empleados.find(empleado => empleado.legajo === legajoEmpleado)
    if (empleadoEncontrado){
      return empleadoEncontrado.Nombre + " " + empleadoEncontrado.Apellido;
    }
    return "";
  }
  
  return (
    
    <Box
    bg={useColorModeValue('white', 'gray.800')}
    p="20px"
    rounded="md"
    mt="20px"
    >
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl htmlFor="titulo" isRequired isInvalid={errors?.titulo}>
          <FormLabel>Titulo</FormLabel>
          <Input
            id="titulo"
            placeholder="Agregá un titulo del Ticket"
            defaultValue = {ticket?.titulo}
            {...register('titulo', {
                required: 'No se puede crear un ticket sin la descripcion',
            })}
          />
          <FormErrorMessage>{errors?.titulo?.message}</FormErrorMessage>
        </FormControl>

        <FormControl htmlFor="descripcion" isRequired isInvalid={errors?.descripcion}>
          <FormLabel>Descripción</FormLabel>
          <Input
            id="descripcion"
            placeholder="Agregá una descripción del Ticket"
            defaultValue = {ticket?.descripcion}
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
            {/* TODO: obtener los productos de la api */}
            <Select
              id="Productos"
              placeholder="Seleccionar producto"
              {...register('Productos', {
                required: 'Debe seleccionar un producto',
            })}

            >
              {productos.map((productos) => {
                //return <p>productos.nombre</p>
                return <option>{productos.nombre}</option>
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
            {/* TODO: obtener las versiones de la api */}
            <Select
              id="Version"
              placeholder="Seleccionar Version del producto"
              {...register('idVersionProducto', {
                required: 'Debe seleccionar una version',
            })}
            >
              <option>V1</option>
              <option>V2</option>
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
              {...register('Cliente', {
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
            htmlFor="persona"
            isInvalid={errors?.persona}
          >
            <FormLabel>Persona asignada</FormLabel>
            {/* TODO: obtener las personas de la api de recursos */}
            <Select
              id="persona"
              placeholder="Seleccionar la persona asignada al ticket"
              defaultValue = {empleado?.Nombre + " " + empleado?.Apellido}
              {...register('persona')}
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
              placeholder="tipo"
              {...register('tipo', {
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
              {...register('Severidad', {
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
              onClick={() => navigate('/soporte')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
              Modificar Ticket
            </Button>
          </ButtonGroup>
        </Flex>
      </Stack>
    </form>
  </Box>
)
   
}

export default ModificarTicketForm




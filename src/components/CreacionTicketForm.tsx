import {
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
    useToast,
    FormErrorMessage,
    Spinner
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { soporteAPI } from '../axios'
import Producto from '../models/Producto'
import Empleado from '../models/Empleado'
import Cliente from '../models/Cliente'
import VersionProducto from '../models/VersionProducto'

interface Props {
  productos: Producto[],
  empleados: Empleado[],
  clientes: Cliente[],
  loading: boolean
}

  const CreacionTicketForm = ({ productos, empleados, clientes, loading }: Props) => {
    const navigate = useNavigate()
    const toast = useToast()
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (ticket: any) => {
      try {
        await soporteAPI.post('/tickets', ticket)
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

    const [productoSeleccionado, setProductoSeleccionado] = useState<any>()

    function setProducto(index: number){
      setProductoSeleccionado(productos[index])
    }

    if (loading) {
      return (
        <Flex p="5px" w="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )
    }

    return (
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
                  {...register('legajoEmpleado', {
                    shouldUnregister: true
                  })}
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
                  <option value="SIN_SEVERIDAD">Sin severidad</option>
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
                  disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                  Crear Ticket
                </Button>
              </ButtonGroup>
            </Flex>
          </Stack>
        </form>
    )
  }

export default CreacionTicketForm

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
  useDisclosure
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { soporteAPI } from '../axios'
import Empleado from '../models/Empleado'
import Ticket from '../models/Ticket'
import ConfirmarCierreTicketModal from "./ConfirmarCierreTicketModal"

const severidad = [
  {
    value: 'SIN_SEVERIDAD',
    nombre: 'SIN SEVERIDAD',
  },
  {
    value: 'S1',
    nombre: 'S1',
  },
  {
    value: 'S2',
    nombre: 'S2',
  },
  {
    value: 'S3',
    nombre: 'S3',
  },
  {
    value: 'S4',
    nombre: 'S4',
  },
]

const tipo = [
  {
    value: 'CONSULTA',
    nombre: 'CONSULTA',
  },
  {
    value: 'INCIDENCIA',
    nombre: 'INCIDENCIA',
  },
]

const estado = [
  {
    value: 'ABIERTO',
    nombre: 'Abierto',
  },
  {
    value: 'ECLIENTE',
    nombre: 'A la espera del cliente',
  },
  {
    value: 'EDESARROLLO',
    nombre: 'A la espera de desarrollo',
  },
  {
    value: 'CERRADO',
    nombre: 'Cerrado',
  },
  {
    value: 'EPROGRESO',
    nombre: 'En progreso',
  },
]

const ModificarTicketForm = () => {

const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
    const toast = useToast()
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
      setValue
    } = useForm()

  let params = useParams();

  const onSubmit = async (ticket: any) => {
    if(ticket.estado === "CERRADO"){
      setTicketACerrar(ticket)
      onOpen()
    } else {
      patch(ticket)
    }
  }

  const patch = async(ticket: any) => {
    try {
      await soporteAPI.patch('/tickets/'+ params.id, ticket)
      toast({
        title: 'Ticket modificado',
        status: 'success',
        isClosable: true,
      })
      navigate(`/soporte/ticket/${params.id}`)
    } catch (err) {
      toast({
        title: 'Ocurrió un error al intentar modificar el ticket ',
        status: 'error',
        isClosable: true,
      })
    }
  }

  const [ticket,setTicket] = useState<Ticket>()
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [ticketACerrar, setTicketACerrar] = useState <Ticket>()

  useEffect(() => {
    const getData = async () => {
      try {
        const empleados = await soporteAPI.get('/empleados')
        const ticket = await soporteAPI.get('/tickets/'+ params.id)
        setEmpleados(empleados.data)
        setTicket(ticket.data)

        setValue('titulo', ticket.data.titulo, { shouldDirty: true })
        setValue('descripcion', ticket.data.descripcion, { shouldDirty: true })
        setValue('estado', ticket.data.estadoTicket, { shouldDirty: true })
        setValue('legajoEmpleado', ticket.data.legajoEmpleado.toString(), { shouldDirty: true })
        setValue('tipoTicket', ticket.data.tipoTicket, { shouldDirty: true })
        setValue('severidadTicket', ticket.data.severidadTicket, { shouldDirty: true })

      } catch {
        //handlear
      }
    }
  getData()
  }, [params.id, setValue])

  return (
  <>
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
            {...register('titulo', {
                required: 'No se puede crear un ticket sin la descripcion',
                value: ticket?.titulo
            })}
          />
          <FormErrorMessage>{errors?.titulo?.message}</FormErrorMessage>
        </FormControl>

        <FormControl htmlFor="descripcion" isRequired isInvalid={errors?.descripcion}>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            id="descripcion"
            placeholder="Agregá una descripción del Ticket"
            {...register('descripcion', {
                required: 'No se puede crear un ticket sin la descripcion'
            })}
          />
          <FormErrorMessage>{errors?.descripcion?.message}</FormErrorMessage>
        </FormControl>

        <HStack>
          <FormControl
            htmlFor="estado" isRequired
            isInvalid={errors?.Estado}
          >
            <FormLabel>Estado</FormLabel>
            <Select
              id="estado"
              placeholder="Seleccionar estado"
              {...register('estado', {
                required: 'No se puede guardar un ticket sin estado',
              })}
            >
              {estado?.map((estado: any) => {
                const selected = ticket?.estadoTicket === estado.value

                return (
                  <option
                    key={estado.value}
                    value={estado.value}
                    selected={selected}
                  >
                    {estado.nombre}
                  </option>
                )
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
            <Select
              id="persona"
              placeholder="Seleccionar la persona asignada al ticket"
              {...register('legajoEmpleado',{
                valueAsNumber: true
              })}
            >
              {empleados.map((empleados) => {
                return <option value = {empleados.legajo} selected={empleados.legajo === ticket?.legajoEmpleado} >{empleados.Nombre + " " + empleados.Apellido}</option>
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
              defaultValue = {ticket?.tipoTicket}
              {...register('tipoTicket', {
                required: 'Debe seleccionar un tipo de ticket',
            })}
            >

              {tipo?.map((tipo: any) => {
                const selected = ticket?.tipoTicket === tipo.nombre

                return (
                  <option
                    key={tipo.value}
                    value={tipo.value}
                    selected={selected}
                  >
                    {tipo.nombre}
                  </option>
                )
              })}
            </Select>

            <FormErrorMessage>{errors?.tipo?.message}</FormErrorMessage>
          </FormControl>

          <FormControl htmlFor="Severidad" isRequired isInvalid={errors?.Severidad}>
            <FormLabel>Severidad</FormLabel>
            <Select
              id="Severidad"
              placeholder="Seleccionar severidad del ticket"
              defaultValue = {ticket?.severidadTicket}
              {...register('severidadTicket', {
                required: 'Debe seleccionar una severidad',
            })}
            >
              {severidad?.map((severidad: any) => {
                const selected = ticket?.severidadTicket === severidad.nombre

                return (
                  <option
                    key={severidad.value}
                    value={severidad.value}
                    selected={selected}
                  >
                    {severidad.nombre}
                  </option>
                )
              })}
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
      {ticketACerrar && (
        <ConfirmarCierreTicketModal
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={() => patch(ticketACerrar)}
          alertHeader="Cerrar ticket"
          alertBody={
            <>
              {"¿Estás seguro que querés cerrar el ticket de forma permanente?"} <br></br><br></br>
              {"⚠️  No podrás realizar modificaciones luego de esta acción."}
            </>
          }
        />
      )}
    </>
  )
}

export default ModificarTicketForm

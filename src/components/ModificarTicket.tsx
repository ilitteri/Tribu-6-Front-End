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
  import ModificarTicketForm from './ModificarTicketForm'

interface Ticket {
  titulo: string,
  descripcion: string,
  fechaCreacion: Date,
  fechaFinalizacion: Date,
  severidadTicket: string,
  legajoEmpleado: number,
  idCliente: number,
  idVersionProducto: number
}


const ModificarTicket = () => {
  return (
    <><Heading>Ticket producto version</Heading>
    <Heading as = 'h3' size = 'md'>fecha de creacion</Heading>
      <ModificarTicketForm />
    </>
  )
}


export default ModificarTicket



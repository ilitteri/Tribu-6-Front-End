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
import { useNavigate, useParams } from 'react-router-dom'

import { proyectosAPI, recursosAPI } from '../axios'

interface Recurso {
  legajo: number
  Nombre: string
  Apellido: string
}

const estados = [
  {
    value: 'No Iniciada',
    nombre: 'No Iniciada',
  },
  {
    value: 'En desarrollo',
    nombre: 'En desarrollo',
  },
  {
    value: 'Terminado',
    nombre: 'Terminado',
  },
]

const ModificacionTareaForm = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([])
  const [proyectos, setProyectos] = useState<any>([])
  const [tarea, setTarea] = useState<any>([])
  const navigate = useNavigate()
  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()
  const { idTarea: tareaId, idProyecto: proyectoId } = useParams()

  useEffect(() => {
    const fetchTarea = async (projectId: any, tareaId: any) => {
      const res = await proyectosAPI.get(
        `/projects/${projectId}/tasks?taskId=${tareaId}`
      )
      setTarea(res.data.message[0])
      reset(res.data.message[0])
    }

    const fetchRecursos = async () => {
      const res = await recursosAPI.get('/recursos')
      setRecursos(res.data)
    }

    const fetchProyectos = async () => {
      const res = await proyectosAPI.get(`/projects`)
      const proy = res.data.message
      setProyectos(proy)
    }

    fetchTarea(proyectoId, tareaId)
    fetchProyectos()
    fetchRecursos()
  }, [proyectoId, reset, tareaId])

  const onCancel = () => {
    toast({
      title: 'No se guardaron los cambios',
      status: 'info',
      isClosable: true,
    })
    navigate(-1)
  }

  const onSubmit = async (tarea: any) => {
    try {
      await proyectosAPI.patch(
        `/projects/${proyectoId}/tasks/${tarea._id}`,
        tarea
      )
      toast({
        title: '¡Se modificó la tarea!👌',
        status: 'success',
        isClosable: true,
      })
      navigate(-1)
    } catch (err) {
      toast({
        title: 'Ocurrió un error al intentar modificar la tarea 😔',
        status: 'error',
        isClosable: true,
      })
    }
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
          <HStack>
            <FormControl htmlFor="nombre" isRequired isInvalid={errors?.nombre}>
              <FormLabel>Nombre</FormLabel>
              <Input
                id="nombre"
                placeholder="Nombre de la tarea"
                {...register('nombre', {
                  required: 'No se puede quitar el nombre a una tarea',
                })}
              />
              <FormErrorMessage>{errors?.nombre?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              htmlFor="proyecto"
              isRequired
              isInvalid={errors?.proyecto}
            >
              <FormLabel>Proyecto</FormLabel>
              <Select
                id="proyecto"
                placeholder="Seleccionar proyecto"
                {...register('proyecto')}
              >
                {proyectos?.map((proyecto: any) => {
                  const selected = proyecto._id.toString() === proyectoId
                  return (
                    <option
                      key={proyecto._id}
                      value={proyecto._id}
                      selected={selected}
                    >
                      {proyecto.nombre}
                    </option>
                  )
                })}
              </Select>
              <FormErrorMessage>{errors?.proyecto?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl htmlFor="estado" isRequired isInvalid={errors?.estado}>
            <FormLabel>Estado</FormLabel>
            <Select
              id="estado"
              placeholder="Seleccionar estado"
              {...register('estado')}
            >
              {estados?.map((estado: any) => {
                const selected = tarea?.estado === estado.nombre

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
            <FormErrorMessage>{errors?.estado?.message}</FormErrorMessage>
          </FormControl>

          <HStack>
            <FormControl
              htmlFor="empleadosResponsables"
              isInvalid={errors?.liderProyecto}
            >
              <FormLabel>Empleado responsable</FormLabel>
              <Select
                id="empleadosResponsables"
                placeholder="Seleccionar empleado"
                {...register('empleadosResponsables')}
              >
                {recursos?.map(({ Nombre, Apellido, legajo }) => {
                  const selected =
                    tarea?.empleadosResponsables?.length > 0 &&
                    tarea?.empleadosResponsables[0] === `${Nombre} ${Apellido}`
                  return (
                    <option
                      key={`${legajo}-${Nombre}-${Apellido}`}
                      value={`${Nombre} ${Apellido}`}
                      selected={selected}
                    >{`${Nombre} ${Apellido}`}</option>
                  )
                })}
              </Select>
              <FormErrorMessage>
                {errors?.empleadosResponsable?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl htmlFor="descripcion" isInvalid={errors?.descripcion}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              id="descripcion"
              placeholder="Modificá la descripción a la tarea..."
              {...register('descripcion')}
            />
            <FormErrorMessage>{errors?.descripcion?.message}</FormErrorMessage>
          </FormControl>

          <Flex w="100%" justifyContent="end">
            <ButtonGroup spacing="6">
              <Button onClick={onCancel} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Guardar
              </Button>
            </ButtonGroup>
          </Flex>
        </Stack>
      </form>
    </Box>
  )
}

export default ModificacionTareaForm

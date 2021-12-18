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
    value: 'No Iniciado',
    nombre: 'No Iniciado',
  },
  {
    value: 'Terminado',
    nombre: 'Terminado',
  },
  {
    value: 'En desarrollo',
    nombre: 'En desarrollo',
  },
]

const opcionesTipoProyecto = [
  {
    value: 'Desarrollo',
    nombre: 'Desarrollo',
  },
  {
    value: 'Implementación',
    nombre: 'Implementación',
  },
]

const validateFechas = ({ fechaInicio, fechaFin }: any) => {
  if (!fechaInicio || !fechaFin) {
    return true
  }

  const fInicio = new Date(fechaInicio).getTime()
  const fFin = new Date(fechaFin).getTime()

  return fInicio <= fFin
}

const ModificacionProyectoForm = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([])
  const [proyecto, setProyecto] = useState<any>([])
  const navigate = useNavigate()
  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm()
  const { id: proyectoId } = useParams()

  useEffect(() => {
    const fetchRecursos = async () => {
      const res = await recursosAPI.get('/recursos')
      setRecursos(res.data)
    }

    const fetchProyecto = async (proyectoId: any) => {
      const res = await proyectosAPI.get(`/projects?projectId=${proyectoId}`) // >:)
      const proy = res.data.message[0]
      setProyecto(proy)
      reset({
        ...proy,
        fechaInicio: formatDate(proy.fechaInicio),
        fechaFin: formatDate(proy.fechaFin),
      })
    }

    fetchProyecto(proyectoId)
    fetchRecursos()
  }, [proyectoId, reset])

  const onCancel = () => {
    toast({
      title: 'No se guardaron los cambios',
      status: 'info',
      isClosable: true,
    })
    navigate(-1)
  }

  const onSubmit = async (proyecto: any) => {
    try {
      await proyectosAPI.patch(`/projects/${proyecto._id}`, proyecto)
      toast({
        title: '¡Se modificó el proyecto! 🥳',
        status: 'success',
        isClosable: true,
      })
      navigate('/proyectos')
    } catch (err) {
      toast({
        title: 'Ocurrió un error al intentar modificar el proyecto 😔',
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
          <FormControl htmlFor="nombre" isRequired isInvalid={errors?.nombre}>
            <FormLabel>Nombre</FormLabel>
            <Input
              id="nombre"
              placeholder="Nombre del proyecto"
              {...register('nombre', {
                required: 'No se puede quitar el nombre a un proyecto',
              })}
            />
            <FormErrorMessage>{errors?.nombre?.message}</FormErrorMessage>
          </FormControl>

          <HStack>
            <FormControl htmlFor="tipo" isRequired isInvalid={errors?.tipo}>
              <FormLabel>Tipo</FormLabel>
              <Select
                id="tipo"
                placeholder="Seleccionar tipo"
                {...register('tipo')}
              >
                {opcionesTipoProyecto.map(({ value, nombre }) => {
                  const selected = proyecto?.tipo === nombre

                  return (
                    <option key={value} value={value} selected={selected}>
                      {nombre}
                    </option>
                  )
                })}
              </Select>
              <FormErrorMessage>{errors?.tipo?.message}</FormErrorMessage>
            </FormControl>

            <FormControl htmlFor="fecha-inicio" isInvalid={errors?.fechaInicio}>
              <FormLabel>Fecha de Inicio</FormLabel>
              <Input
                id="fecha-inicio"
                type="date"
                {...register('fechaInicio', {
                  validate: () => validateFechas(getValues()),
                })}
              />
            </FormControl>
          </HStack>

          <HStack>
            <FormControl
              htmlFor="liderProyecto"
              isInvalid={errors?.liderProyecto}
            >
              <FormLabel>Líder</FormLabel>
              <Select
                id="liderProyecto"
                placeholder="Seleccionar líder"
                {...register('liderProyecto')}
              >
                {recursos?.map(({ Nombre, Apellido, legajo }) => {
                  const selected =
                    proyecto?.liderProyecto === `${Nombre} ${Apellido}`

                  return (
                    <option
                      key={`${legajo}-${Nombre}-${Apellido}`}
                      value={`${Nombre} ${Apellido}`}
                      selected={selected}
                    >{`${Nombre} ${Apellido} (${legajo})`}</option>
                  )
                })}
              </Select>
              <FormErrorMessage>
                {errors?.liderProyecto?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl htmlFor="fecha-fin" isInvalid={errors?.fechaFin}>
              <FormLabel>Fecha de Fin</FormLabel>
              <Input
                id="fecha-fin"
                type="date"
                {...register('fechaFin', {
                  validate: () => validateFechas(getValues()),
                })}
              />
              {errors?.fechaFin?.type === 'validate' && (
                <FormErrorMessage>
                  La fecha de fin debe ser posterior a la fecha de inicio
                </FormErrorMessage>
              )}
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
                const selected = proyecto?.estado === estado.nombre

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

          <FormControl htmlFor="descripcion" isInvalid={errors?.descripcion}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              id="descripcion"
              placeholder="Modificá la descripción al proyecto..."
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

function formatDate(isoDate: string) {
  if (!isoDate) return isoDate

  const date = new Date(isoDate)
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}

export default ModificacionProyectoForm

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
import { useNavigate, useSearchParams } from 'react-router-dom'

import { proyectosAPI } from '../axios'

interface Proyecto {
  _id: number
  nombre: string
  estado: string
  descripcion: string
  liderProyecto: string
  tipo: string
  fechaInicio: string
  fechaFin: string
}

interface Recurso {
  legajo: number
  Nombre: string
  Apellido: string
}

const mockRecursos: Recurso[] = [
  {
    legajo: 1,
    Nombre: 'Mario',
    Apellido: 'Mendoza',
  },
  {
    legajo: 2,
    Nombre: 'Maria',
    Apellido: 'Perez',
  },
  {
    legajo: 3,
    Nombre: 'Patricia',
    Apellido: 'Gaona',
  },
]

const CreacionTareaForm = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [recursos, setRecursos] = useState<Recurso[]>([])
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _setSearchParams] = useSearchParams()
  const proyectoId = searchParams.get('proyectoId')

  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    const fetchProyectos = async () => {
      const res = await proyectosAPI.get('/projects')
      setProyectos(res.data.message)
    }

    const fetchRecursos = async () => {
      // TODO: Descomentar al resolver problema de cors
      // const res = await recursosAPI.get('/recursos')
      // setRecursos(res.data)
      setRecursos(mockRecursos)
    }

    fetchProyectos()
    fetchRecursos()
  }, [])

  const onSubmit = async (tarea: any) => {
    try {
      await proyectosAPI.post(`/projects/${proyectoId}/tasks`, tarea)
      toast({
        title: '¡Se creó la tarea! 🥳',
        status: 'success',
        isClosable: true,
      })
      navigate(-1)
    } catch (err) {
      toast({
        title: 'Ocurrió un error al intentar crear tarea 😔',
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
                placeholder="Nombre del proyecto"
                {...register('nombre', {
                  required: 'No se puede crear un proyecto sin nombre',
                })}
              />
              <FormErrorMessage>{errors?.nombre?.message}</FormErrorMessage>
            </FormControl>

            <FormControl htmlFor="tipo" isRequired isInvalid={errors?.proyecto}>
              <FormLabel>Proyecto</FormLabel>
              <Select
                id="proyecto"
                placeholder="Seleccionar proyecto"
                {...register('proyecto')}
              >
                {proyectos?.map((proyecto) => {
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
                {recursos?.map(({ Nombre, Apellido, legajo }) => (
                  <option
                    key={`${legajo}-${Nombre}-${Apellido}`}
                    value={`${Nombre} ${Apellido}`}
                  >{`${Nombre} ${Apellido} (${legajo})`}</option>
                ))}
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
              placeholder="Agregá una descripción al proyecto..."
              {...register('descripcion')}
            />
            <FormErrorMessage>{errors?.descripcion?.message}</FormErrorMessage>
          </FormControl>

          <Flex w="100%" justifyContent="end">
            <ButtonGroup spacing="6">
              <Button onClick={() => navigate(-1)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Crear tarea
              </Button>
            </ButtonGroup>
          </Flex>
        </Stack>
      </form>
    </Box>
  )
}

export default CreacionTareaForm

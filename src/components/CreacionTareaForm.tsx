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

const opcionesTipoProyecto = [
  {
    value: 'Desarrollo',
    nombre: 'Desarrollo',
  },
  {
    value: 'Implementacion',
    nombre: 'Implementación',
  },
]

const CreacionTareaForm = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([])
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const proyectoId = searchParams.get('proyectoId')
  const cancelURL = proyectoId ? `/proyectos/${proyectoId}` : '/proyectos'

  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm()

  useEffect(() => {
    const fetchRecursos = async () => {
      // TODO: Descomentar al resolver problema de cors
      // const res = await recursosAPI.get('/recursos')
      // setRecursos(res.data)
      setRecursos(mockRecursos)
    }
    fetchRecursos()
  }, [])

  const onSubmit = async (proyecto: any) => {
    try {
      await proyectosAPI.post('/projects', proyecto)
      toast({
        title: '¡Se creó la tarea! 🥳',
        status: 'success',
        isClosable: true,
      })
      navigate('/')
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

            <FormControl htmlFor="tipo" isRequired isInvalid={errors?.tipo}>
              <FormLabel>Proyecto</FormLabel>
              <Select
                id="proyecto"
                placeholder="Seleccionar tipo"
                {...register('tipo')}
              >
                {opcionesTipoProyecto.map(({ value, nombre }) => (
                  <option key={value} value={value}>
                    {nombre}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.tipo?.message}</FormErrorMessage>
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
                {recursos?.map(({ Nombre, Apellido, legajo }) => (
                  <option
                    key={`${legajo}-${Nombre}-${Apellido}`}
                    value={`${Nombre} ${Apellido}`}
                  >{`${Nombre} ${Apellido} (${legajo})`}</option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors?.liderProyecto?.message}
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
              <Button
                onClick={() => navigate(cancelURL)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Crear proyecto
              </Button>
            </ButtonGroup>
          </Flex>
        </Stack>
      </form>
    </Box>
  )
}

export default CreacionTareaForm

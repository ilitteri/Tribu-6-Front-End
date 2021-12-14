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
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import axios from '../axios'

// TODO: agregar validaciones
const CreacionProyectoForm = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (proyecto: any) => {
    try {
      await axios.post('/projects', proyecto)
      toast({
        title: '¡Se creó el proyecto! 🥳',
        status: 'success',
        isClosable: true,
      })
      navigate('/proyectos')
    } catch (err) {
      toast({
        title: 'Ocurrió un error al intentar crear el proyecto 😔',
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
                required: 'No se puede crear un proyecto sin nombre',
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
                {/* TODO: revisar porque no está tomando la tilde */}
                <option>Desarrollo</option>
                <option>Implementación</option>
              </Select>
              <FormErrorMessage>{errors?.tipo?.message}</FormErrorMessage>
            </FormControl>

            <FormControl htmlFor="fecha-inicio" isInvalid={errors?.fechaInicio}>
              <FormLabel>Fecha de Inicio</FormLabel>
              <Input
                id="fecha-inicio"
                type="date"
                {...register('fechaInicio')}
              />
              <FormErrorMessage>
                {errors?.fechaInicio?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <HStack>
            <FormControl
              htmlFor="liderProyecto"
              isInvalid={errors?.liderProyecto}
            >
              <FormLabel>Líder</FormLabel>
              {/* TODO: obtener las personas de la api de recursos */}
              <Select
                id="liderProyecto"
                placeholder="Seleccionar líder"
                {...register('liderProyecto')}
              >
                <option>Fulano</option>
                <option>Pepito</option>
              </Select>
              <FormErrorMessage>
                {errors?.liderProyecto?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl htmlFor="fecha-fin" isInvalid={errors?.fechaFin}>
              <FormLabel>Fecha de Fin</FormLabel>
              <Input id="fecha-fin" type="date" {...register('fechaFin')} />
              <FormErrorMessage>{errors?.fechaFin?.message}</FormErrorMessage>
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
                onClick={() => navigate('/proyectos')}
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

export default CreacionProyectoForm

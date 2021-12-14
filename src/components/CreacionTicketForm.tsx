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
  
  import { soporteAPI } from '../axios'
  
  // TODO: agregar validaciones
  const CreacionTicketForm = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm()
  
    const onSubmit = async (proyecto: any) => {
      try {
        await soporteAPI.post('/tickets', Tickets)  // ¿esta bien esto? me tiraba error y de repente pasó
        toast({
          title: 'Ticket creado',
          status: 'success',
          isClosable: true,
        })
        navigate('/tickets')
      } catch (err) {
        toast({
          title: 'Ocurrió un error al intentar crear el ticket ',
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
            <FormControl htmlFor="Titulo" isRequired isInvalid={errors?.Titulo}>
              <FormLabel>Titulo del ticket</FormLabel>
              <Input
                id="Titulo"
                placeholder="Titulo"
                {...register('Titulo', {
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
                {/* TODO: obtener los productos de la api */}
                <Select
                  id="Productos"
                  placeholder="Seleccionar producto"
                  {...register('Productos', {
                    required: 'Debe seleccionar un producto',
                })}

                >
                  <option>Fulano</option>
                  <option>Pepito</option>
                </Select>
                <FormErrorMessage>
                  {errors?.liderProyecto?.message}
                </FormErrorMessage>
              </FormControl>
  
              <FormControl
                htmlFor="Version" isRequired
                isInvalid={errors?.liderProyecto}
              >
                <FormLabel>Version</FormLabel>
                {/* TODO: obtener las versiones de la api */}
                <Select
                  id="Version" 
                  placeholder="Seleccionar Version del producto"
                  {...register('Version', {
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
                isInvalid={errors?.liderProyecto}
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
                  <option>C1</option>
                  <option>C2</option>
                </Select>
                <FormErrorMessage>
                  {errors?.Cliente?.message}
                </FormErrorMessage>
              </FormControl>
  
              <FormControl
                htmlFor="Persona" isRequired
                isInvalid={errors?.liderProyecto}
              >
                <FormLabel>Persona asignada</FormLabel>
                {/* TODO: obtener las personas de la api de recursos */}
                <Select
                  id="persona"
                  placeholder="Seleccionar la persona asignada al ticket"
                  {...register('persona')}
                >
                  <option>V1</option>
                  <option>V2</option>
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
                  <option>Consulta</option>
                  <option>Incidencia</option>
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

function Tickets(arg0: string, Tickets: any) {
    throw new Error('Function not implemented.')
}

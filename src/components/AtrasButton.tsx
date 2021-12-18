import { Button } from '@chakra-ui/react'
import { GoArrowLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const VolverButton = ({ referencia }: any) => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => {
        navigate(referencia)
      }}
      leftIcon={<GoArrowLeft />}
      colorScheme="gray"
      variant="outline"
    >
      Volver
    </Button>
  )
}

export default VolverButton

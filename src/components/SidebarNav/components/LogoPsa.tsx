import React from 'react'
import { Image } from '@chakra-ui/react'
import LogoPSANavidad from '../../../assets/logo_navidad.png'
import { useNavigate } from 'react-router'

const LogoPsa = ({ ...rest }) => {
  const navigate = useNavigate()

  return (
    <Image
      onClick={() => navigate('/')}
      cursor="pointer"
      p="4px"
      maxH="100%"
      src={LogoPSANavidad}
      alt="Logo psa"
      {...rest}
    />
  )
}

export default LogoPsa

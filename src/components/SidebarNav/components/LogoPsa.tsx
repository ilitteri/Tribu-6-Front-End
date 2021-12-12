import React from 'react'
import { Image } from '@chakra-ui/react'
import LogoPSANavidad from '../../../assets/logo_navidad.png'

const LogoPsa = ({ ...rest }) => (
  <Image p="4px" maxH="100%" src={LogoPSANavidad} alt="Logo psa" {...rest} />
)

export default LogoPsa

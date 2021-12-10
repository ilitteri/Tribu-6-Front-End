import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
  Grid,
} from '@chakra-ui/react'
import { GoProject } from 'react-icons/go'
import { AiFillFire } from 'react-icons/ai'
import { IconType } from 'react-icons'

import NavItem from './NavItem'
import LogoPsa from './LogoPsa'
import ColorModeSwitcher from '../../../ColorModeSwitcher'

interface LinkItemProps {
  name: string
  icon: IconType
  href?: string
}

const linkItems: LinkItemProps[] = [
  { name: 'Proyectos', icon: GoProject, href: '/proyectos' },
  { name: 'Soporte', icon: AiFillFire, href: '/soporte' },
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <LogoPsa />
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {linkItems.map((link) => (
      <NavItem key={link.name} href={link.href} icon={link.icon}>
        {link.name}
      </NavItem>
    ))}
    <Grid p={3}>
      <ColorModeSwitcher />
    </Grid>
  </Box>
)

export default SidebarContent

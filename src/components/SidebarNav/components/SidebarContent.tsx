import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react'
import { GoProject } from 'react-icons/go'
import { AiFillFire } from 'react-icons/ai'
import { IconType } from 'react-icons'

import NavItem from './NavItem'

interface LinkItemProps {
  name: string
  icon: IconType
  href?: string
}

const linkItems: LinkItemProps[] = [
  { name: 'Proyectos', icon: GoProject, href: '/projects' },
  { name: 'Soporte', icon: AiFillFire },
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
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
        <Text fontSize="2xl" fontWeight="bold">
          PSA
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItem key={link.name} href={link.href} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

export default SidebarContent

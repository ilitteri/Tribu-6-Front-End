import {
  IconButton,
  Flex,
  useColorModeValue,
  FlexProps,
  Box,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import LogoPsa from './LogoPsa'

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 24 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    justifyContent="flex-start"
    {...rest}
  >
    <IconButton
      variant="outline"
      onClick={onOpen}
      aria-label="open menu"
      icon={<FiMenu />}
    />
    <LogoPsa />
  </Flex>
)

export default MobileNav

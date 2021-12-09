import { ReactText } from 'react';
import { Flex, Icon, Link, FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  href?: string;
  icon: IconType;
  children: ReactText;
}

const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => (
  <Link
    href={href || '#'}
    style={{ textDecoration: 'none', outline: 'none' }}
    _focus={{ outline: 'none' }}
  >
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'teal.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  </Link>
);

export default NavItem;

import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

const Sidebar = () => {
	return (
		<Flex pos="sticky" left="0" h="100vw" direction="column" w="200px" p="5">
			<Button>Proyectos</Button>
			<Button>Soporte</Button>
		</Flex>
	);
};

export default Sidebar;

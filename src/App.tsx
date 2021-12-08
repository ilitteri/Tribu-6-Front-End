import * as React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Sidebar from './components/Sidebar';
import LogoPsa from './components/LogoPsa';
import ListadoProyectos from './components/ListadoProyectos';

export const App = () => (
	<ChakraProvider theme={theme}>
		<Box textAlign="center" fontSize="xl">
			<Grid p={3}>
				<ColorModeSwitcher justifySelf="flex-end" />
				<LogoPsa />
			</Grid>
			<Sidebar />
			<ListadoProyectos />
		</Box>
	</ChakraProvider>
);

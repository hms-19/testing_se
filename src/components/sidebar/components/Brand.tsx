// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';
import Image from 'next/image';

export function SidebarBrand() {

	return (
		<Flex alignItems='center' flexDirection='column' justifyContent={'center'}>
			<Image src={'/logo.png'} alt='sports-empire' width={60} height={60} priority />
			<HSeparator my='20px' />
		</Flex>
	);
}

export default SidebarBrand;

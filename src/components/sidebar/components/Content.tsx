import { Box, Flex, Stack } from '@chakra-ui/react';
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import { IRoute } from 'types/navigation';
import { getRole } from 'utils/local-storage';

interface SidebarContentProps {
  routes: IRoute[];
}

function SidebarContent(props: SidebarContentProps) {
  const { routes } = props;
  const role = getRole();

  // Filter routes based on role condition
  const filteredRoutes = routes.filter((route) => {
    // Exclude "Admin" route if role is 1
    if (route.name === 'Admin' && role === '1') {
      return false;
    }
    return true;
  });
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Brand />
      <Stack direction="column" mt="8px" mb="auto">
        <Box ps="20px" pe={{ lg: '16px', '2xl': '16px' }}>
          <Links routes={filteredRoutes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;

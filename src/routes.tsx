import { Icon } from '@chakra-ui/react';
import { MdCorporateFare, MdEmojiFlags, MdHome } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { MdOutlineSportsVolleyball } from 'react-icons/md';
import { FaHandsHelping } from 'react-icons/fa';
import { TbBrandBooking } from 'react-icons/tb';

import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/home',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Admin',
    layout: '/home',
    path: '/admin',
    icon: <Icon as={RiAdminFill} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Owner',
    layout: '/home',
    path: '/owner',
    icon: <Icon as={FaUserTie} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Users',
    layout: '/home',
    path: '/users',
    icon: <Icon as={FaRegUser} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Region',
    layout: '/home',
    path: '/region',
    icon: <Icon as={MdEmojiFlags} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Township',
    layout: '/home',
    path: '/township',
    icon: (
      <Icon as={MdCorporateFare} width="20px" height="20px" color="inherit" />
    ),
  },

  {
    name: 'Sport Types',
    layout: '/home',
    path: '/sport-types',
    icon: (
      <Icon
        as={MdOutlineSportsVolleyball}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
  },

  {
    name: 'Payment',
    layout: '/home',
    path: '/payment',
    icon: <Icon as={MdEmojiFlags} width="20px" height="20px" color="inherit" />,
  },

  {
    name: 'Booking Lists',
    layout: '/home',
    path: '/booking-lists',
    icon: (
      <Icon as={TbBrandBooking} width="20px" height="20px" color="inherit" />
    ),
  },

  {
    name: 'Help & Support',
    layout: '/home',
    path: '/help',
    icon: (
      <Icon as={FaHandsHelping} width="20px" height="20px" color="inherit" />
    ),
  },
];

export default routes;

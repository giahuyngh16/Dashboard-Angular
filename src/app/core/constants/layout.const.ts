import { appRoutingsConfig } from '../routings';
import { ISidebarMenu } from '../interfaces/side-bar-menu.interface';

const SIDE_BARS: ISidebarMenu = {
  'Customer': {
    image: 'assets/img/menu/users',
    icon: 'fa fa-link',
    route: appRoutingsConfig.customer.path,
    isOpenMenu: false,
    roles: 'Manager'
  },
  'Staff': {
    image: 'assets/img/menu/users',
    icon: 'fa fa-link',
    route: appRoutingsConfig.staff.path,
    isOpenMenu: false,
    roles: 'Manager',
  }
};

export { SIDE_BARS };

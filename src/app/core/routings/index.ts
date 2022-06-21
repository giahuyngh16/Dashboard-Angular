import { ROLES, ALL_ROLES } from '../roles';

const ROUTING_NAME = {
  UNAUTHORIZED: 'unauthorized',
  NOT_FOUND: '404',
  CUSTOMER: 'customer',
  STAFF: 'staff',
  USERS: 'user',
  PRODUCT_DETAIL: 'product-detail',
  PRODUCT_SIZE: 'product-size',
};

const ROUTING_PATH = {
  NOT_FOUND: '/not-found',
  CUSTOMER: {
    ROOT: '/customer',
  },
  STAFF: {
    ROOT: '/staff',
    CREATE_STAFF: '/staff/create',
    UPDATE_STAFF: '/staff/update',
  },
  PRODUCT_DETAIL: {
    ROOT: '/product-detail',
    CREATE: '/product-detail/create',
    UPDATE: '/product-detail/update',
  },
  PRODUCT_SIZE: {
    ROOT: '/product-size',
    CREATE: '/product-size/create',
    UPDATE: '/product-size/update',
  },
  USERS: {
    ROOT: '/user',
    LOGIN: '/user/login'
  },
};

const appRoutingsConfig = {
  unauthorized: {
    moduleNamePath: ROUTING_NAME.UNAUTHORIZED,
    path: ROUTING_NAME.UNAUTHORIZED,
    menuLabel: 'Unauthorized',
    data: {
      roles: [ALL_ROLES],
      breadcrumb: [
        {
          url: ROUTING_NAME.UNAUTHORIZED,
          navMenuLabel: 'Unauthorized'
        }
      ],
      url: ROUTING_NAME.UNAUTHORIZED
    }
  },
  notFound: {
    moduleNamePath: ROUTING_NAME.NOT_FOUND,
    path: ROUTING_NAME.NOT_FOUND,
    menuLabel: 'Not Found',
    data: {
      roles: [ALL_ROLES],
      breadcrumb: [
        {
          url: ROUTING_NAME.NOT_FOUND,
          navMenuLabel: 'Not Found'
        }
      ],
      url: ROUTING_NAME.NOT_FOUND
    }
  },
  users: {
    moduleNamePath: ROUTING_NAME.USERS,
    path: ROUTING_NAME.USERS,
    data: {
      url: ROUTING_NAME.USERS
    },
    children: {
      login: {
        moduleNamePath: '',
        path: ROUTING_PATH.USERS.LOGIN,
        data: {
          url: ROUTING_PATH.USERS.LOGIN
        }
      },
    },
  },
  customer: {
    moduleNamePath: ROUTING_NAME.CUSTOMER,
    path: ROUTING_NAME.CUSTOMER,
    menuLabel: 'Customer',
    data: {
      roles: [ROLES.CUSTOMER, ROLES.STAFF, ROLES.ADMIN],
      breadcrumb: [
        {
          url: ROUTING_NAME.CUSTOMER,
          navMenuLabel: 'Customer'
        }
      ],
      url: ROUTING_NAME.CUSTOMER
    }
  },
  staff: {
    moduleNamePath: ROUTING_NAME.STAFF,
    path: ROUTING_NAME.STAFF,
    menuLabel: 'Staff',
    data: {
      roles: [],
      breadcrumb: [
        {
          url: ROUTING_NAME.STAFF,
          navMenuLabel: 'Staff'
        }
      ],
      url: ROUTING_NAME.STAFF
    },
    children: {
      createStaff: {
        moduleNamePath: '',
        path: ROUTING_PATH.STAFF.CREATE_STAFF,
        menuLabel: 'Create New Staff',
        data: {
          roles: [],
          breadcrumb: [
            {
              url: ROUTING_NAME.STAFF,
              navMenuLabel: 'Staff'
            },
            {
              url: ROUTING_PATH.STAFF.CREATE_STAFF,
              navMenuLabel: 'Create New Staff'
            },
          ],
          url: ROUTING_PATH.STAFF.CREATE_STAFF
        }
      },
      updateStaff: {
        moduleNamePath: '',
        path: ROUTING_PATH.STAFF.UPDATE_STAFF,
        menuLabel: 'Update Staff',
        data: {
          roles: [],
          breadcrumb: [
            {
              url: ROUTING_NAME.STAFF,
              navMenuLabel: 'Staff'
            },
            {
              url: ROUTING_PATH.STAFF.UPDATE_STAFF,
              navMenuLabel: 'Update Staff'
            },
          ],
          url: ROUTING_PATH.STAFF.UPDATE_STAFF
        }
      },
    }
  },
  productDetail: {
    moduleNamePath: ROUTING_NAME.PRODUCT_DETAIL,
    path: ROUTING_NAME.PRODUCT_DETAIL,
    menuLabel: 'Product Detail',
    data: {
      roles: [],
      breadcrumb: [
        {
          url: ROUTING_NAME.PRODUCT_DETAIL,
          navMenuLabel: 'Product Detail'
        }
      ],
      url: ROUTING_NAME.PRODUCT_DETAIL
    },
    children: {
      createProductDetail: {
        moduleNamePath: '',
        path: ROUTING_PATH.PRODUCT_DETAIL.CREATE,
        menuLabel: 'Create New Product Detail',
        data: {
          roles: [],
          breadcrumb: [
            {
              url: ROUTING_NAME.PRODUCT_DETAIL,
              navMenuLabel: 'Product Detail'
            },
            {
              url: ROUTING_PATH.PRODUCT_DETAIL.CREATE,
              navMenuLabel: 'Create New Product Detail'
            },
          ],
          url: ROUTING_PATH.PRODUCT_DETAIL.CREATE
        }
      },
      updateProductDetail: {
        moduleNamePath: '',
        path: ROUTING_PATH.PRODUCT_DETAIL.UPDATE,
        menuLabel: 'Update Product Detail',
        data: {
          roles: [],
          breadcrumb: [
            {
              url: ROUTING_NAME.PRODUCT_DETAIL,
              navMenuLabel: 'Product Detail'
            },
            {
              url: ROUTING_PATH.PRODUCT_DETAIL.UPDATE,
              navMenuLabel: 'Update Product Detail'
            },
          ],
          url: ROUTING_PATH.PRODUCT_DETAIL.UPDATE
        }
      },
    }
  },
  productSize: {
    moduleNamePath: ROUTING_NAME.PRODUCT_SIZE,
    path: ROUTING_NAME.PRODUCT_SIZE,
    menuLabel: 'Product Size',
    data: {
      roles: [],
      breadcrumb: [
        {
          url: ROUTING_NAME.PRODUCT_SIZE,
          navMenuLabel: 'Product Size'
        }
      ],
      url: ROUTING_NAME.PRODUCT_SIZE
    },
    children: {
      createProductSize: {
        moduleNamePath: '',
        path: ROUTING_PATH.PRODUCT_SIZE.CREATE,
        menuLabel: 'Create New Product Size',
        data: {
          roles: [],
          breadcrumb: [
            {
              url: ROUTING_NAME.PRODUCT_SIZE,
              navMenuLabel: 'Product Size'
            },
            {
              url: ROUTING_PATH.PRODUCT_SIZE.CREATE,
              navMenuLabel: 'Create New Product Size'
            },
          ],
          url: ROUTING_PATH.PRODUCT_SIZE.CREATE
        }
      },
      updateProductSize: {
        moduleNamePath: '',
        path: ROUTING_PATH.PRODUCT_SIZE.UPDATE,
        menuLabel: 'Update Product Size',
        data: {
          roles: [],
          breadcrumb: [
            {
              url: ROUTING_NAME.PRODUCT_SIZE,
              navMenuLabel: 'Product Size'
            },
            {
              url: ROUTING_PATH.PRODUCT_SIZE.UPDATE,
              navMenuLabel: 'Update Product Size'
            },
          ],
          url: ROUTING_PATH.PRODUCT_SIZE.UPDATE
        }
      },
    }
  },
};

export { appRoutingsConfig, ROUTING_PATH };

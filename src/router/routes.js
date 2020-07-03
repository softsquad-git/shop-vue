const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue'), name: 'HomePage'},
      {
        path: 'zaloguj-się',
        component: () => import('pages/front/auth/fLogin.vue'),
        name: 'fLogin'
      },
      {
        path: 'zarejestruj-się',
        component: () => import('pages/front/auth/fRegister.vue'),
        name: 'fRegister'
      },
      {
        path: 'sklep',
        component: () => import('pages/front/shop/fProductsList.vue'),
        name: 'fProductsList'
      },
      {
        path: 'sklep/produkt/:title/:id',
        component: () => import('pages/front/shop/fProductShow.vue'),
        name: 'fProductShow'
      },
      {
        path: 'sklep/:alias',
        component: () => import('pages/front/shop/fProductsInCategory.vue'),
        name: 'fProductsInCategory'
      }
    ]
  },
  {
    path: '/account',
    component: () => import('layouts/AdminLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/admin/AdminPage.vue'),
        name: 'AdminPage'
      },
      {
        path: 'products',
        component: () => import('pages/admin/products/ProductsList.vue'),
        name: 'ProductsList'
      },
      {
        path: 'create-product',
        component: () => import('pages/admin/products/CreateProduct.vue'),
        name: 'CreateProduct'
      },
      {
        path: 'edit-product/:id/:title',
        component: () => import('pages/admin/products/EditProduct.vue'),
        name: 'EditProduct'
      },
      {
        path: 'product/:id/:title',
        component: () => import('pages/admin/products/ProductShow.vue'),
        name: 'ProductShow'
      },
      {
        path: 'categories',
        component: () => import('pages/admin/categories/CategoriesList.vue'),
        name: 'CategoriesList'
      },
      {
        path: 'create-category',
        component: () => import('pages/admin/categories/CreateCategory.vue'),
        name: 'CreateCategory'
      },
      {
        path: 'shipments',
        component: () => import('pages/admin/shipments/ShipmentsList.vue'),
        name: 'ShipmentsList'
      },
      {
        path: 'create-shipment',
        component: () => import('pages/admin/shipments/CreateShipment.vue'),
        name: 'CreateShipment'
      },
      {
        path: 'edit-shipment/:id',
        component: () => import('pages/admin/shipments/EditShipment.vue'),
        name: 'EditShipment'
      },
      {
        path: 'orders',
        component: () => import('pages/admin/orders/OrdersList.vue'),
        name: 'OrdersList'
      },
      {
        path: 'users',
        component: () => import('pages/admin/users/UsersList.vue'),
        name: 'UsersList'
      }
    ]
  },
  {
    path: '/configuration',
    component: () => import('pages/Configuration'),
    name: 'Configuration'
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

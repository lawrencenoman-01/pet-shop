import MainLayout from '@layouts/MainLayout';
import AddProduct from '@pages/AddProduct';
import CartProduct from '@pages/CartProduct';
import Detail from '@pages/Detail';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import UpdateProduct from '@pages/UpdateProduct';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    protected: true,
    component: Detail,
    layout: MainLayout,
  },
  {
    path: '/cart',
    name: 'Cart',
    protected: true,
    component: CartProduct,
    layout: MainLayout,
  },
  {
    path: '/addProduct',
    name: 'AddProduct',
    protected: true,
    component: AddProduct,
    layout: MainLayout,
  },
  {
    path: '/updateProduct/:id',
    name: 'UpdateProduct',
    protected: true,
    component: UpdateProduct,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;

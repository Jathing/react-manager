import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '@/views/login/Login'
import Error404 from '@/views/404.tsx'
import Error403 from '@/views/403.tsx'
import Dashboard from '@/views/dashboard'
import Layout from '@/layout'
import Welcome from '@/views/welcome'
import User from '@/views/system/user'

const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userList',
        element: <User />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter(router)

// export default createBrowserRouter(router)

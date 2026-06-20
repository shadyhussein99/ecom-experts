import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '@/layouts/RootLayout'
import SystemBuilder from '@/pages/systemBuilder/SystemBuilder'
import NotFound from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <SystemBuilder /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '@/layouts/rootLayout/RootLayout'
import SystemBuilder from '@/pages/systemBuilder/SystemBuilder'
import NotFound from '@/pages/notFound/NotFound'

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

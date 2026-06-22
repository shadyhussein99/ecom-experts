import { Outlet } from 'react-router-dom'
import { rootLayoutStyles } from './rootLayoutStyles'

function RootLayout() {
  return (
    <div className={rootLayoutStyles.container}>
      <main className={rootLayoutStyles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout

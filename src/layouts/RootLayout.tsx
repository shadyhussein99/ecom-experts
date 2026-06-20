import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto w-full flex-1 px-24 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout

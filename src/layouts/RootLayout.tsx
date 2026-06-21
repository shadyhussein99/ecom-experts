import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto w-full flex-1 px-0 py-8 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout

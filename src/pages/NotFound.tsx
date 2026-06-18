import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h1>404</h1>
      <p>This page doesn’t exist.</p>
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  )
}

export default NotFound

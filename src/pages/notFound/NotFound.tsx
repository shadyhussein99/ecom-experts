import { Link } from 'react-router-dom'
import { Button } from '@/components/atoms/button/Button'
import { notFoundStyles } from './notFoundStyles'

function NotFound() {
  return (
    <div className={notFoundStyles.container}>
      <h1>404</h1>
      <p>This page doesn’t exist.</p>
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  )
}

export default NotFound

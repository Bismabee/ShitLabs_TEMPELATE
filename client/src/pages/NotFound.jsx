import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="text-center space-y-4">
    <h1 className="text-2xl font-semibold">404 — Not Found</h1>
    <p className="text-slate-600">The page you’re looking for doesn’t exist.</p>
    <Link to="/" className="underline">Go back home</Link>
  </div>
)

export default NotFound

import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Hotel Atlantis
            </Link>
          </div>
          
          <div className="flex gap-4">
            <Link 
              to="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/menu-cliente" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Gerenciamento
            </Link>
            <Link 
              to="/menu-listagem" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Listagem
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
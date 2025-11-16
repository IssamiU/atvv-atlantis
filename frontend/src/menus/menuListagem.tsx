import { Link } from 'react-router-dom'

function MenuListagem() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Consultas e Relatórios
      </h1>
      
      <div className="grid md:grid-cols-3 gap-4">
        <Link 
          to="/listagem-cliente"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Clientes
          </h3>
          <p className="text-sm text-gray-600">
            Visualize todos os clientes cadastrados
          </p>
        </Link>
        
        <Link 
          to="/listagem-acomodacao"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Acomodações
          </h3>
          <p className="text-sm text-gray-600">
            Veja as acomodações disponíveis
          </p>
        </Link>
        
        <Link 
          to="/listagem-hospedagem"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Hospedagens
          </h3>
          <p className="text-sm text-gray-600">
            Consulte as hospedagens registradas
          </p>
        </Link>
      </div>
    </div>
  )
}

export default MenuListagem
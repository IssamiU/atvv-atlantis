import { Link } from 'react-router-dom'

function MenuCliente() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Gerenciamento de Clientes e Hospedagens
      </h1>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Link 
          to="/cadastro-cliente-titular"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cadastrar Cliente Titular
          </h3>
          <p className="text-sm text-gray-600">
            Cadastre novos clientes titulares no sistema
          </p>
        </Link>
        
        <Link 
          to="/cadastro-cliente-dependente"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cadastrar Cliente Dependente
          </h3>
          <p className="text-sm text-gray-600">
            Adicione dependentes aos clientes titulares
          </p>
        </Link>
        
        <Link 
          to="/editar-cliente"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Editar Cliente
          </h3>
          <p className="text-sm text-gray-600">
            Atualize as informações dos clientes
          </p>
        </Link>

        <Link 
          to="/excluir-cliente"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Excluir Cliente
          </h3>
          <p className="text-sm text-gray-600">
            Remova clientes do sistema
          </p>
        </Link>

        <Link 
          to="/cadastro-hospedagem"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cadastrar Hospedagem
          </h3>
          <p className="text-sm text-gray-600">
            Registre novas hospedagens para os clientes
          </p>
        </Link>

        <Link 
          to="/deletar-hospedagem"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500 text-left block"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Excluir Hospedagem
          </h3>
          <p className="text-sm text-gray-600">
            Remova hospedagens do sistema
          </p>
        </Link>
      </div>
    </div>
  )
}

export default MenuCliente
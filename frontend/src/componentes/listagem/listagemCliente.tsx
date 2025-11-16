import { useState, useEffect } from 'react'
import { clienteAPI } from '../../services/api'

interface Cliente {
  _id: string
  nome: string
  nomeSocial?: string
  dataNascimento: string
  cpf: string
  telefone: string
  email: string
  endereco?: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  tipo: 'titular' | 'dependente'
  idTitular?: string
}

function ListagemCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [tipoVisualizacao, setTipoVisualizacao] = useState<'todos' | 'titulares' | 'dependentes'>('todos')

  useEffect(() => {
    carregarClientes()
  }, [])

  const carregarClientes = async () => {
    try {
      const response = await clienteAPI.listar()
      setClientes(response.data)
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
      alert('Erro ao carregar clientes!')
    }
  }

  const titulares = clientes.filter(c => c.tipo === 'titular')
  const dependentes = clientes.filter(c => c.tipo === 'dependente')

  const encontrarNomeTitular = (idTitular: string) => {
    const titular = titulares.find(t => t._id === idTitular)
    return titular ? titular.nome : 'Não encontrado'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Listagem de Clientes</h2>
      
      <div className="mb-6 flex gap-3 justify-center flex-wrap">
        <button 
          onClick={() => setTipoVisualizacao('todos')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            tipoVisualizacao === 'todos' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Todos
        </button>
        <button 
          onClick={() => setTipoVisualizacao('titulares')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            tipoVisualizacao === 'titulares' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Titulares ({titulares.length})
        </button>
        <button 
          onClick={() => setTipoVisualizacao('dependentes')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            tipoVisualizacao === 'dependentes' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Dependentes ({dependentes.length})
        </button>
      </div>

      {(tipoVisualizacao === 'todos' || tipoVisualizacao === 'titulares') && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Clientes Titulares
          </h3>
          {titulares.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">Nenhum cliente titular cadastrado</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {titulares.map(cliente => (
                <div 
                  key={cliente._id} 
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{cliente.nome}</h4>
                    {cliente.nomeSocial && (
                      <p className="text-gray-600 mt-1">Nome Social: {cliente.nomeSocial}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">CPF:</span>
                      <span className="ml-2 text-gray-600">{cliente.cpf}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Data de Nascimento:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Telefone:</span>
                      <span className="ml-2 text-gray-600">{cliente.telefone}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">E-mail:</span>
                      <span className="ml-2 text-gray-600">{cliente.email}</span>
                    </div>
                  </div>

                  {cliente.endereco && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-medium text-gray-700 mb-2">Endereço</p>
                      <div className="text-sm text-gray-600">
                        <p>{cliente.endereco.rua}, {cliente.endereco.numero}</p>
                        <p>{cliente.endereco.bairro} - {cliente.endereco.cidade}/{cliente.endereco.estado}</p>
                        <p>CEP: {cliente.endereco.cep}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {(tipoVisualizacao === 'todos' || tipoVisualizacao === 'dependentes') && (
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Clientes Dependentes
          </h3>
          {dependentes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">Nenhum cliente dependente cadastrado</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {dependentes.map(cliente => (
                <div 
                  key={cliente._id} 
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{cliente.nome}</h4>
                    {cliente.nomeSocial && (
                      <p className="text-gray-600 mt-1">Nome Social: {cliente.nomeSocial}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">CPF:</span>
                      <span className="ml-2 text-gray-600">{cliente.cpf}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Data de Nascimento:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Telefone:</span>
                      <span className="ml-2 text-gray-600">{cliente.telefone}</span>
                    </div>
                    {cliente.idTitular && (
                      <div>
                        <span className="font-medium text-gray-700">Titular Responsável:</span>
                        <span className="ml-2 text-gray-600">{encontrarNomeTitular(cliente.idTitular)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ListagemCliente
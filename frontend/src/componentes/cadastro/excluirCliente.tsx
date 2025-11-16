import { useState, useEffect } from 'react'
import { clienteAPI } from '../../services/api'

interface Cliente {
  _id: string
  nome: string
  cpf: string
  tipo: 'titular' | 'dependente'
}

function ExcluirCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    carregarClientes()
  }, [])

  const carregarClientes = async () => {
    try {
      const response = await clienteAPI.listar()
      setClientes(response.data)
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
    }
  }

  const handleExcluir = async (id: string, nome: string) => {
    const confirmar = window.confirm(`Tem certeza que deseja excluir o cliente ${nome}?`)
    
    if (confirmar) {
      try {
        await clienteAPI.deletar(id)
        carregarClientes()
        alert('Cliente excluído com sucesso!')
      } catch (error: any) {
        console.error('Erro ao excluir cliente:', error)
        alert(error.response?.data?.mensagem || 'Erro ao excluir cliente!')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Excluir Cliente</h2>

        {clientes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum cliente cadastrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {clientes.map(cliente => (
              <div 
                key={cliente._id} 
                className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-900">{cliente.nome}</p>
                  <p className="text-sm text-gray-600">CPF: {cliente.cpf}</p>
                </div>
                <button
                  onClick={() => handleExcluir(cliente._id, cliente.nome)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExcluirCliente
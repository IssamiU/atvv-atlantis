import { useState, useEffect } from 'react'
import { hospedagemAPI } from '../../services/api'

interface Hospedagem {
  _id: string
  idCliente: {
    _id: string
    nome: string
    cpf: string
  }
  nomeAcomodacao: string
}

function DeletarHospedagem() {
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([])

  useEffect(() => {
    carregarHospedagens()
  }, [])

  const carregarHospedagens = async () => {
    try {
      const response = await hospedagemAPI.listar()
      setHospedagens(response.data)
    } catch (error) {
      console.error('Erro ao carregar hospedagens:', error)
    }
  }

  const handleDeletar = async (id: string) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta hospedagem?')
    
    if (confirmar) {
      try {
        await hospedagemAPI.deletar(id)
        carregarHospedagens()
        alert('Hospedagem excluída com sucesso!')
      } catch (error: any) {
        console.error('Erro ao excluir hospedagem:', error)
        alert(error.response?.data?.mensagem || 'Erro ao excluir hospedagem!')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Excluir Hospedagem</h2>

        {hospedagens.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma hospedagem cadastrada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {hospedagens.map((hospedagem, index) => (
              <div 
                key={hospedagem._id} 
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Hospedagem #{index + 1}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Cliente:</span>
                        <span className="ml-2 text-gray-600">
                          {hospedagem.idCliente?.nome || 'Cliente não encontrado'}
                        </span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-700">CPF:</span>
                        <span className="ml-2 text-gray-600">
                          {hospedagem.idCliente?.cpf || 'N/A'}
                        </span>
                      </div>
                      
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Acomodação:</span>
                        <span className="ml-2 text-purple-600 font-semibold">
                          {hospedagem.nomeAcomodacao}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeletar(hospedagem._id)}
                    className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DeletarHospedagem
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

function ListagemHospedagem() {
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
      alert('Erro ao carregar hospedagens!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Hospedagens Registradas</h2>
      
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          Total: <span className="font-semibold text-gray-900">{hospedagens.length}</span> hospedagens
        </p>
      </div>

      {hospedagens.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">Nenhuma hospedagem encontrada</p>
        </div>
      ) : (
        <div className="space-y-4">
          {hospedagens.map((hospedagem, index) => (
            <div 
              key={hospedagem._id} 
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">Hospedagem #{index + 1}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Cliente</p>
                  <p className="text-gray-900 font-semibold">
                    {hospedagem.idCliente?.nome || 'Cliente não encontrado'}
                  </p>
                  <p className="text-sm text-gray-600">
                    CPF: {hospedagem.idCliente?.cpf || 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Acomodação</p>
                  <p className="text-purple-600 font-bold text-lg">{hospedagem.nomeAcomodacao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListagemHospedagem
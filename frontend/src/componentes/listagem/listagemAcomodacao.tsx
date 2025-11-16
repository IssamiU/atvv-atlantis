import { useState, useEffect } from 'react'

interface Acomodacao {
  NomeAcomodacao: string
  CamaCasal: number
  CamaSolteiro: number
  Climatizacao: boolean
  Garagem: number
  Suite: number
}

function ListagemAcomodacao() {
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([])

  useEffect(() => {
    carregarAcomodacoes()
  }, [])

  const carregarAcomodacoes = async () => {
    try {
      const response = await fetch('/data/listaAcomodacoes.json')
      const dados = await response.json()
      setAcomodacoes(dados)
    } catch (error) {
      console.error('Erro ao carregar acomodações:', error)
    }
  }

  const calcularCapacidade = (acomodacao: Acomodacao) => {
    return (acomodacao.CamaCasal * 2) + acomodacao.CamaSolteiro
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Acomodações Disponíveis</h2>
      
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          Total: <span className="font-semibold text-gray-900">{acomodacoes.length}</span> acomodações
        </p>
      </div>

      {acomodacoes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">Nenhuma acomodação encontrada</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acomodacoes.map((acomodacao, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{acomodacao.NomeAcomodacao}</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Camas de Casal</span>
                  <span className="font-semibold text-gray-900">{acomodacao.CamaCasal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Camas de Solteiro</span>
                  <span className="font-semibold text-gray-900">{acomodacao.CamaSolteiro}</span>
                </div>
                
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Capacidade Total</span>
                  <span className="font-bold">{calcularCapacidade(acomodacao)} pessoas</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Climatização</span>
                  <span className="font-semibold text-gray-900">
                    {acomodacao.Climatizacao ? 'Sim' : 'Não'}
                  </span>
                </div>             
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Vagas Garagem</span>
                  <span className="font-semibold text-gray-900">{acomodacao.Garagem}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Suítes</span>
                  <span className="font-semibold text-gray-900">{acomodacao.Suite}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListagemAcomodacao
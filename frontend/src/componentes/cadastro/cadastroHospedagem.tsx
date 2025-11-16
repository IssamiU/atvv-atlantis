import { useState, useEffect } from 'react'
import { clienteAPI, hospedagemAPI } from '../../services/api'

interface Hospedagem {
  idCliente: string
  nomeAcomodacao: string
}

interface Cliente {
  _id: string
  nome: string
  cpf: string
}

interface Acomodacao {
  NomeAcomodacao: string
  CamaCasal: number
  CamaSolteiro: number
  Climatizacao: boolean
  Garagem: number
  Suite: number
}

function CadastroHospedagem() {
  const [hospedagem, setHospedagem] = useState<Hospedagem>({
    idCliente: '',
    nomeAcomodacao: ''
  })

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([])
  const [acomodacaoSelecionada, setAcomodacaoSelecionada] = useState<Acomodacao | null>(null)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      const resClientes = await clienteAPI.listar()
      const todosTitulares = resClientes.data.filter((c: any) => c.tipo === 'titular')
      setClientes(todosTitulares)

      const resAcomodacoes = await fetch('/data/listaAcomodacoes.json')
      const dadosAcomodacoes = await resAcomodacoes.json()
      setAcomodacoes(dadosAcomodacoes)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const calcularCapacidade = (acomodacao: Acomodacao) => {
    return (acomodacao.CamaCasal * 2) + acomodacao.CamaSolteiro
  }

  const handleAcomodacaoChange = (nomeAcomodacao: string) => {
    const acomodacao = acomodacoes.find(a => a.NomeAcomodacao === nomeAcomodacao)
    setAcomodacaoSelecionada(acomodacao || null)
    setHospedagem(prev => ({ ...prev, nomeAcomodacao }))
  }

  const validarFormulario = (): boolean => {
    if (!hospedagem.idCliente) {
      alert('Selecione um cliente!')
      return false
    }

    if (!hospedagem.nomeAcomodacao) {
      alert('Selecione uma acomodação!')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) return

    try {
      await hospedagemAPI.criar(hospedagem)

      alert('Hospedagem cadastrada com sucesso!')

      setHospedagem({
        idCliente: '',
        nomeAcomodacao: ''
      })
      setAcomodacaoSelecionada(null)
    } catch (error: any) {
      console.error('Erro ao cadastrar hospedagem:', error)
      alert(error.response?.data?.mensagem || 'Erro ao cadastrar hospedagem!')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cadastro de Hospedagem</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente Titular *
            </label>
            <select
              value={hospedagem.idCliente}
              onChange={(e) => setHospedagem({ ...hospedagem, idCliente: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Selecione um cliente</option>
              {clientes.map(cliente => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nome} - CPF: {cliente.cpf}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Acomodação *
            </label>
            <select
              value={hospedagem.nomeAcomodacao}
              onChange={(e) => handleAcomodacaoChange(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Selecione uma acomodação</option>
              {acomodacoes.map((acomodacao, index) => (
                <option key={index} value={acomodacao.NomeAcomodacao}>
                  {acomodacao.NomeAcomodacao} - Capacidade: {calcularCapacidade(acomodacao)} pessoas
                </option>
              ))}
            </select>
            
            {acomodacaoSelecionada && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-md">
                <h4 className="font-semibold text-gray-900 mb-3">Detalhes da Acomodação</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Camas de Casal:</span>
                    <span className="ml-2">{acomodacaoSelecionada.CamaCasal}</span>
                  </div>
                  <div>
                    <span className="font-medium">Camas de Solteiro:</span>
                    <span className="ml-2">{acomodacaoSelecionada.CamaSolteiro}</span>
                  </div>
                  <div>
                    <span className="font-medium">Capacidade:</span>
                    <span className="ml-2">{calcularCapacidade(acomodacaoSelecionada)} pessoas</span>
                  </div>
                  <div>
                    <span className="font-medium">Climatização:</span>
                    <span className="ml-2">{acomodacaoSelecionada.Climatizacao ? 'Sim' : 'Não'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Vagas Garagem:</span>
                    <span className="ml-2">{acomodacaoSelecionada.Garagem}</span>
                  </div>
                  <div>
                    <span className="font-medium">Suítes:</span>
                    <span className="ml-2">{acomodacaoSelecionada.Suite}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Cadastrar Hospedagem
          </button>
        </form>
      </div>
    </div>
  )
}

export default CadastroHospedagem
import { useState, useEffect } from 'react'
import { clienteAPI } from '../../services/api'

interface ClienteDependente {
  idTitular: string
  nome: string
  nomeSocial: string
  dataNascimento: string
  cpf: string
  telefone: string
  email: string
  tipo: 'dependente'
}

interface ClienteTitular {
  _id: string
  nome: string
  cpf: string
}

function CadastroClienteDependente() {
  const [dependente, setDependente] = useState<ClienteDependente>({
    idTitular: '',
    nome: '',
    nomeSocial: '',
    dataNascimento: '',
    cpf: '',
    telefone: '',
    email: '',
    tipo: 'dependente'
  })

  const [titulares, setTitulares] = useState<ClienteTitular[]>([])

  useEffect(() => {
    carregarTitulares()
  }, [])

  const carregarTitulares = async () => {
    try {
      const response = await clienteAPI.listar()
      const todosTitulares = response.data.filter((c: any) => c.tipo === 'titular')
      setTitulares(todosTitulares)
    } catch (error) {
      console.error('Erro ao carregar titulares:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await clienteAPI.criar(dependente)
      
      alert('Cliente dependente cadastrado com sucesso!')

      setDependente({
        idTitular: '',
        nome: '',
        nomeSocial: '',
        dataNascimento: '',
        cpf: '',
        telefone: '',
        email: '',
        tipo: 'dependente'
      })
    } catch (error: any) {
      console.error('Erro ao cadastrar dependente:', error)
      alert(error.response?.data?.mensagem || 'Erro ao cadastrar dependente!')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cadastro de Cliente Dependente</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente Titular *
            </label>
            <select
              value={dependente.idTitular}
              onChange={(e) => setDependente({ ...dependente, idTitular: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecione o titular</option>
              {titulares.map(titular => (
                <option key={titular._id} value={titular._id}>
                  {titular.nome} - CPF: {titular.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={dependente.nome}
                onChange={(e) => setDependente({ ...dependente, nome: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Social
              </label>
              <input
                type="text"
                value={dependente.nomeSocial}
                onChange={(e) => setDependente({ ...dependente, nomeSocial: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento *
              </label>
              <input
                type="date"
                value={dependente.dataNascimento}
                onChange={(e) => setDependente({ ...dependente, dataNascimento: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF *
              </label>
              <input
                type="text"
                value={dependente.cpf}
                onChange={(e) => setDependente({ ...dependente, cpf: e.target.value })}
                required
                placeholder="000.000.000-00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                value={dependente.telefone}
                onChange={(e) => setDependente({ ...dependente, telefone: e.target.value })}
                required
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                value={dependente.email}
                onChange={(e) => setDependente({ ...dependente, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Cadastrar Dependente
          </button>
        </form>
      </div>
    </div>
  )
}

export default CadastroClienteDependente
import { useState } from 'react'
import { clienteAPI } from '../../services/api'

interface ClienteTitular {
  nome: string
  nomeSocial: string
  dataNascimento: string
  cpf: string
  telefone: string
  email: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  tipo: 'titular'
}

function CadastroClienteTitular() {
  const [cliente, setCliente] = useState<ClienteTitular>({
    nome: '',
    nomeSocial: '',
    dataNascimento: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    tipo: 'titular'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await clienteAPI.criar(cliente)
      
      alert('Cliente titular cadastrado com sucesso!')
      
      setCliente({
        nome: '',
        nomeSocial: '',
        dataNascimento: '',
        cpf: '',
        telefone: '',
        email: '',
        endereco: {
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: ''
        },
        tipo: 'titular'
      })
    } catch (error: any) {
      console.error('Erro ao cadastrar cliente:', error)
      alert(error.response?.data?.mensagem || 'Erro ao cadastrar cliente!')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cadastro de Cliente Titular</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={cliente.nome}
                onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Social
              </label>
              <input
                type="text"
                value={cliente.nomeSocial}
                onChange={(e) => setCliente({ ...cliente, nomeSocial: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento *
              </label>
              <input
                type="date"
                value={cliente.dataNascimento}
                onChange={(e) => setCliente({ ...cliente, dataNascimento: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF *
              </label>
              <input
                type="text"
                value={cliente.cpf}
                onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                required
                placeholder="000.000.000-00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                value={cliente.telefone}
                onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                required
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                value={cliente.email}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP *
                </label>
                <input
                  type="text"
                  value={cliente.endereco.cep}
                  onChange={(e) => setCliente({ ...cliente, endereco: { ...cliente.endereco, cep: e.target.value } })}
                  required
                  placeholder="00000-000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rua *
                </label>
                <input
                  type="text"
                  value={cliente.endereco.rua}
                  onChange={(e) => setCliente({ ...cliente, endereco: { ...cliente.endereco, rua: e.target.value } })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número *
                </label>
                <input
                  type="text"
                  value={cliente.endereco.numero}
                  onChange={(e) => setCliente({ ...cliente, endereco: { ...cliente.endereco, numero: e.target.value } })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro *
                </label>
                <input
                  type="text"
                  value={cliente.endereco.bairro}
                  onChange={(e) => setCliente({ ...cliente, endereco: { ...cliente.endereco, bairro: e.target.value } })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  value={cliente.endereco.cidade}
                  onChange={(e) => setCliente({ ...cliente, endereco: { ...cliente.endereco, cidade: e.target.value } })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <input
                  type="text"
                  value={cliente.endereco.estado}
                  onChange={(e) => setCliente({ ...cliente, endereco: { ...cliente.endereco, estado: e.target.value } })}
                  required
                  maxLength={2}
                  placeholder="UF"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Cadastrar Cliente
          </button>
        </form>
      </div>
    </div>
  )
}

export default CadastroClienteTitular
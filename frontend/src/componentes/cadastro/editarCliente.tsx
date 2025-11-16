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
}

function EditarCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
  const [clienteEditado, setClienteEditado] = useState<Cliente | null>(null)

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

  const handleSelecionar = (id: string) => {
    const cliente = clientes.find(c => c._id === id)
    if (cliente) {
      setClienteSelecionado(cliente)
      setClienteEditado({
        ...cliente,
        dataNascimento: new Date(cliente.dataNascimento).toISOString().split('T')[0]
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clienteEditado || !clienteSelecionado) return

    try {
      await clienteAPI.atualizar(clienteSelecionado._id, clienteEditado)

      alert('Cliente atualizado com sucesso!')

      setClienteSelecionado(null)
      setClienteEditado(null)
      carregarClientes()
    } catch (error: any) {
      console.error('Erro ao atualizar cliente:', error)
      alert(error.response?.data?.mensagem || 'Erro ao atualizar cliente!')
    }
  }

  const handleCancelar = () => {
    setClienteSelecionado(null)
    setClienteEditado(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Cliente</h2>

        {!clienteSelecionado ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecione o cliente para editar
            </label>
            <select
              onChange={(e) => handleSelecionar(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Selecione um cliente</option>
              {clientes.map(cliente => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nome} - CPF: {cliente.cpf} ({cliente.tipo})
                </option>
              ))}
            </select>
          </div>
        ) : clienteEditado ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={clienteEditado.nome}
                  onChange={(e) => setClienteEditado({ ...clienteEditado, nome: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Social
                </label>
                <input
                  type="text"
                  value={clienteEditado.nomeSocial || ''}
                  onChange={(e) => setClienteEditado({ ...clienteEditado, nomeSocial: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  value={clienteEditado.dataNascimento}
                  onChange={(e) => setClienteEditado({ ...clienteEditado, dataNascimento: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF *
                </label>
                <input
                  type="text"
                  value={clienteEditado.cpf}
                  onChange={(e) => setClienteEditado({ ...clienteEditado, cpf: e.target.value })}
                  required
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={clienteEditado.telefone}
                  onChange={(e) => setClienteEditado({ ...clienteEditado, telefone: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={clienteEditado.email}
                  onChange={(e) => setClienteEditado({ ...clienteEditado, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            {clienteEditado.tipo === 'titular' && clienteEditado.endereco && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                    <input
                      type="text"
                      value={clienteEditado.endereco.cep || ''}
                      onChange={(e) => setClienteEditado({
                        ...clienteEditado,
                        endereco: { ...clienteEditado.endereco!, cep: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rua</label>
                    <input
                      type="text"
                      value={clienteEditado.endereco.rua || ''}
                      onChange={(e) => setClienteEditado({
                        ...clienteEditado,
                        endereco: { ...clienteEditado.endereco!, rua: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
                    <input
                      type="text"
                      value={clienteEditado.endereco.numero || ''}
                      onChange={(e) => setClienteEditado({
                        ...clienteEditado,
                        endereco: { ...clienteEditado.endereco!, numero: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                    <input
                      type="text"
                      value={clienteEditado.endereco.bairro || ''}
                      onChange={(e) => setClienteEditado({
                        ...clienteEditado,
                        endereco: { ...clienteEditado.endereco!, bairro: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                    <input
                      type="text"
                      value={clienteEditado.endereco.cidade || ''}
                      onChange={(e) => setClienteEditado({
                        ...clienteEditado,
                        endereco: { ...clienteEditado.endereco!, cidade: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                    <input
                      type="text"
                      value={clienteEditado.endereco.estado || ''}
                      onChange={(e) => setClienteEditado({
                        ...clienteEditado,
                        endereco: { ...clienteEditado.endereco!, estado: e.target.value.toUpperCase() }
                      })}
                      maxLength={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent uppercase"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={handleCancelar}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  )
}

export default EditarCliente
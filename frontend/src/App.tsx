import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './componentes/Navbar'
import Home from './home'
import MenuCliente from './menus/menuCliente'
import MenuListagem from './menus/menuListagem'
import CadastroClienteTitular from './componentes/cadastro/cadastroClienteTitular'
import CadastroClienteDependente from './componentes/cadastro/cadastroClienteDependente'
import CadastroHospedagem from './componentes/cadastro/cadastroHospedagem'
import EditarCliente from './componentes/cadastro/editarCliente'
import ExcluirCliente from './componentes/cadastro/excluirCliente'
import DeletarHospedagem from './componentes/cadastro/deletarHospedagem'
import ListagemCliente from './componentes/listagem/listagemCliente'
import ListagemAcomodacao from './componentes/listagem/listagemAcomodacao'
import ListagemHospedagem from './componentes/listagem/listagemHospedagem'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu-cliente" element={<MenuCliente />} />
            <Route path="/menu-listagem" element={<MenuListagem />} />
            <Route path="/cadastro-cliente-titular" element={<CadastroClienteTitular />} />
            <Route path="/cadastro-cliente-dependente" element={<CadastroClienteDependente />} />
            <Route path="/cadastro-hospedagem" element={<CadastroHospedagem />} />
            <Route path="/editar-cliente" element={<EditarCliente />} />
            <Route path="/excluir-cliente" element={<ExcluirCliente />} />
            <Route path="/deletar-hospedagem" element={<DeletarHospedagem />} />
            <Route path="/listagem-cliente" element={<ListagemCliente />} />
            <Route path="/listagem-acomodacao" element={<ListagemAcomodacao />} />
            <Route path="/listagem-hospedagem" element={<ListagemHospedagem />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
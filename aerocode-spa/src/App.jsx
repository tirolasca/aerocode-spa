import { useState } from 'react';
import './index.css';
import PaginaLogin from './paginas/PaginaLogin';
import BarraLateral from './componentes/BarraLateral';
import PainelInicial from './paginas/PainelInicial';
import PaginaOrdens from './paginas/PaginaOrdens';
import { PaginaQualidade, PaginaComponentes, PaginaRelatorios, PaginaUsuarios, PaginaConfiguracoes } from './paginas/OutrasPaginas';

const TITULOS_PAGINAS = {
  painel:'Painel Inicial', ordens:'Ordens de Produção', componentes:'Componentes',
  qualidade:'Controle de Qualidade', relatorios:'Relatórios', usuarios:'Usuários', configuracoes:'Configurações',
};

function AplicacaoPrincipal({ aoSair }) {
  const [paginaAtiva, setPaginaAtiva] = useState('painel');
  const [menuAberto, setMenuAberto] = useState(false);

  function renderizarPagina() {
    switch(paginaAtiva) {
      case 'painel':        return <PainelInicial />;
      case 'ordens':        return <PaginaOrdens />;
      case 'componentes':   return <PaginaComponentes />;
      case 'qualidade':     return <PaginaQualidade />;
      case 'relatorios':    return <PaginaRelatorios />;
      case 'usuarios':      return <PaginaUsuarios />;
      case 'configuracoes': return <PaginaConfiguracoes />;
      default:              return <PainelInicial />;
    }
  }

  return (
    <div className="layout-app">
      <div className={`overlay-mobile${menuAberto ? ' ativo' : ''}`} onClick={() => setMenuAberto(false)} />

      <BarraLateral
        paginaAtiva={paginaAtiva}
        setPaginaAtiva={setPaginaAtiva}
        aoSair={aoSair}
        aberta={menuAberto}
        fechar={() => setMenuAberto(false)}
      />

      <div className="conteudo-principal">
        <header className="cabecalho">
          <button className="btn-menu-mobile" onClick={() => setMenuAberto(true)} aria-label="Abrir menu">
            <i className="fa-solid fa-bars"></i>
          </button>
          <span className="titulo-pagina">{TITULOS_PAGINAS[paginaAtiva]}</span>
          <div className="cabecalho-direita">
            <button className="btn-icone tooltip-container" title="Ajuda">
              <i className="fa-regular fa-circle-question"></i>
              <span className="tooltip">Central de Ajuda</span>
            </button>
            <button className="btn-icone tooltip-container">
              <i className="fa-solid fa-bell"></i>
              <span className="notificacao-ponto"></span>
              <span className="tooltip">Notificações (3)</span>
            </button>
            <div className="avatar-cabecalho" title="Carlos Silva">CS</div>
          </div>
        </header>
        <main className="area-pagina">
          {renderizarPagina()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  return autenticado
    ? <AplicacaoPrincipal aoSair={() => setAutenticado(false)} />
    : <PaginaLogin aoEntrar={() => setAutenticado(true)} />;
}

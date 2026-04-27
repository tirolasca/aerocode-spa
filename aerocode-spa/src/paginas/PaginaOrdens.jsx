import { useState } from 'react';
import { ordens, detalheOrdens } from '../dados/dadosMock';

function BadgeStatus({ status }) {
  const mapa = { 'Em Produção':'badge-info','Concluído':'badge-sucesso','Planejado':'badge-neutro' };
  return <span className={`badge ${mapa[status]||'badge-neutro'}`}>{status}</span>;
}
function BadgePrioridade({ prioridade }) {
  const mapa = { 'Crítica':'badge-perigo','Alta':'badge-aviso','Normal':'badge-neutro' };
  return <span className={`badge ${mapa[prioridade]||'badge-neutro'}`}>{prioridade}</span>;
}
function BadgeFase({ status }) {
  const mapa = { 'Concluído':'badge-sucesso','Em Produção':'badge-info','Pendente':'badge-neutro' };
  return <span className={`badge ${mapa[status]||'badge-neutro'}`} style={{fontSize:'10.5px',padding:'2px 8px'}}>{status}</span>;
}
function BadgeComp({ status }) {
  const mapa = { 'Instalado':'badge-sucesso','Aguardando':'badge-aviso','Em Fabricação':'badge-info' };
  return <span className={`badge ${mapa[status]||'badge-neutro'}`} style={{fontSize:'10.5px',padding:'2px 8px'}}>{status}</span>;
}

function DetalheOrdem({ ordem, aoVoltar }) {
  const detalhe = detalheOrdens[ordem.id] || { fases:[], componentes:[], historico:[] };
  return (
    <div className="deslizar-entrada">
      <div className="cabecalho-pagina">
        <div className="titulo-area">
          <div className="migalhas">
            <span className="migalhas-link" onClick={aoVoltar}>
              <i className="fa-solid fa-clipboard-list"></i> Ordens de Produção
            </span>
            <i className="fa-solid fa-chevron-right" style={{fontSize:'10px'}}></i>
            <span>{ordem.id}</span>
          </div>
          <h2 className="titulo-principal">{ordem.id} — {ordem.aeronave}</h2>
          <p className="subtitulo-pagina">{ordem.cliente}</p>
        </div>
        <div className="cabecalho-acoes">
          <button className="btn btn-secundario btn-sm">
            <i className="fa-solid fa-pen-to-square"></i> Editar
          </button>
          <button className="btn btn-primario btn-sm">
            <i className="fa-solid fa-plus"></i> Nova Inspeção
          </button>
        </div>
      </div>

      <div className="grade-info-ordem">
        {[
          ['fa-calendar-plus','Início',ordem.inicio],
          ['fa-calendar-check','Entrega Prevista',ordem.entrega],
          ['fa-flag','Prioridade',ordem.prioridade],
          ['fa-circle-info','Status',ordem.status],
        ].map(([icone, rotulo, valor]) => (
          <div key={rotulo} className="cartao cartao-info-ordem">
            <div className="cartao-info-icone">
              <i className={`fa-solid ${icone}`}></i>
            </div>
            <div>
              <div className="cartao-info-rotulo">{rotulo}</div>
              <div className="cartao-info-valor">{valor}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cartao cartao-progresso-geral">
        <div className="progresso-geral-cabecalho">
          <span className="progresso-geral-rotulo">
            <i className="fa-solid fa-circle-half-stroke"></i> Progresso Geral da Ordem
          </span>
          <span className="progresso-geral-valor">{ordem.progresso}%</span>
        </div>
        <div className="barra-progresso-fundo barra-progresso-lg">
          <div className="barra-progresso-fill" style={{ width:`${ordem.progresso}%` }} />
        </div>
      </div>

      <div className="grade-detalhe-2col">
        <div className="cartao">
          <div className="cartao-cabecalho">
            <span className="cartao-titulo">
              <i className="fa-solid fa-list-check"></i> Fases de Produção
            </span>
          </div>
          <div className="cartao-corpo">
            {detalhe.fases.length > 0 ? detalhe.fases.map((fase, i) => (
              <div key={i} className="linha-fase">
                <span className="fase-nome">{fase.nome}</span>
                <div className="fase-barra">
                  <div className="barra-progresso-fundo barra-progresso-sm">
                    <div className="barra-progresso-fill" style={{ width:`${fase.progresso}%` }} />
                  </div>
                </div>
                <span className="fase-pct">{fase.progresso}%</span>
                <BadgeFase status={fase.status} />
              </div>
            )) : (
              <div className="estado-vazio">
                <div className="estado-vazio-icone"><i className="fa-solid fa-list-check"></i></div>
                <p>Sem fases cadastradas.</p>
              </div>
            )}
          </div>
        </div>

        <div className="cartao">
          <div className="cartao-cabecalho">
            <span className="cartao-titulo">
              <i className="fa-solid fa-gears"></i> Componentes Críticos
            </span>
          </div>
          <div className="container-tabela">
            <table>
              <thead>
                <tr><th>Componente</th><th>Qtd</th><th>Status</th></tr>
              </thead>
              <tbody>
                {detalhe.componentes.length > 0 ? detalhe.componentes.map((c, i) => (
                  <tr key={i}>
                    <td>{c.nome}</td>
                    <td><strong>{c.quantidade}</strong></td>
                    <td><BadgeComp status={c.status} /></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="celula-vazia">Sem componentes registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="cartao">
        <div className="cartao-cabecalho">
          <span className="cartao-titulo">
            <i className="fa-solid fa-timeline"></i> Histórico de Engenharia
          </span>
          <button className="btn btn-ghost btn-sm">
            <i className="fa-solid fa-plus"></i> Adicionar nota
          </button>
        </div>
        <div className="cartao-corpo">
          {detalhe.historico.length > 0 ? detalhe.historico.map((nota, i) => (
            <div key={i} className="item-historico">
              <div className="historico-avatar">
                {nota.autor.split(' ').map(x => x[0]).slice(-2).join('')}
              </div>
              <div>
                <div className="historico-autor">
                  {nota.autor}{' '}
                  <span className="historico-data">— {nota.data}</span>
                </div>
                <p className="historico-texto">{nota.texto}</p>
              </div>
            </div>
          )) : (
            <div className="estado-vazio">
              <div className="estado-vazio-icone"><i className="fa-solid fa-comment-slash"></i></div>
              <p>Nenhuma observação registrada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaginaOrdens() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  if (ordemSelecionada) {
    return <DetalheOrdem ordem={ordemSelecionada} aoVoltar={() => setOrdemSelecionada(null)} />;
  }

  const ordensFiltradas = ordens.filter(o => {
    const bateBusca = o.id.toLowerCase().includes(busca.toLowerCase()) ||
      o.aeronave.toLowerCase().includes(busca.toLowerCase()) ||
      o.cliente.toLowerCase().includes(busca.toLowerCase());
    const bateFiltro = filtro === 'Todos' || o.status === filtro;
    return bateBusca && bateFiltro;
  });

  return (
    <div className="fade-entrada">
      <div className="cabecalho-pagina">
        <div className="titulo-area">
          <h2 className="titulo-principal">Ordens de Produção</h2>
          <p className="subtitulo-pagina">
            <i className="fa-solid fa-database"></i> {ordens.length} ordens no sistema
          </p>
        </div>
        <button className="btn btn-primario" onClick={() => setMostrarModal(true)}>
          <i className="fa-solid fa-plus"></i> Nova Ordem
        </button>
      </div>

      <div className="barra-ferramentas">
        <div className="barra-busca">
          <i className="fa-solid fa-magnifying-glass barra-busca-icone"></i>
          <input
            className="barra-busca-input"
            placeholder="Buscar por número, aeronave ou cliente..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
        <div className="abas">
          {['Todos','Em Produção','Planejado','Concluído'].map(f => (
            <button key={f} className={`aba${filtro === f ? ' ativa' : ''}`} onClick={() => setFiltro(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="cartao">
        <div className="container-tabela">
          <table>
            <thead>
              <tr>
                <th>Nº Ordem</th>
                <th>Aeronave</th>
                <th>Cliente</th>
                <th>Início</th>
                <th>Entrega</th>
                <th>Progresso</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ordensFiltradas.map(ordem => (
                <tr key={ordem.id}>
                  <td><strong className="texto-primario">{ordem.id}</strong></td>
                  <td><span className="texto-negrito">{ordem.aeronave}</span></td>
                  <td className="texto-secundario">{ordem.cliente}</td>
                  <td className="texto-secundario texto-sm">{ordem.inicio}</td>
                  <td className="texto-secundario texto-sm">{ordem.entrega}</td>
                  <td className="coluna-progresso">
                    <div className="barra-progresso-container-inline">
                      <div className="barra-progresso-fundo barra-progresso-sm" style={{flex:1}}>
                        <div className="barra-progresso-fill" style={{width:`${ordem.progresso}%`}} />
                      </div>
                      <span className="barra-progresso-texto">{ordem.progresso}%</span>
                    </div>
                  </td>
                  <td><BadgePrioridade prioridade={ordem.prioridade} /></td>
                  <td><BadgeStatus status={ordem.status} /></td>
                  <td>
                    <div className="grupo-acoes">
                      <button className="btn btn-secundario btn-sm tooltip-container" onClick={() => setOrdemSelecionada(ordem)}>
                        <i className="fa-solid fa-eye"></i>
                        <span className="tooltip">Ver detalhes</span>
                      </button>
                      <button className="btn btn-secundario btn-sm tooltip-container">
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span className="tooltip">Editar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {ordensFiltradas.length === 0 && (
                <tr>
                  <td colSpan={9} className="celula-vazia">
                    <i className="fa-solid fa-search"></i> Nenhuma ordem encontrada para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && (
        <div className="fundo-modal" onClick={() => setMostrarModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-cabecalho">
              <span className="modal-titulo">
                <i className="fa-solid fa-plus-circle"></i> Nova Ordem de Produção
              </span>
              <button className="btn btn-ghost btn-sm" onClick={() => setMostrarModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-corpo">
              <div className="grupo-campo">
                <label className="rotulo">Modelo de Aeronave</label>
                <input className="campo-input" placeholder="ex: Airbus A320" />
              </div>
              <div className="grupo-campo">
                <label className="rotulo">Cliente</label>
                <input className="campo-input" placeholder="ex: Lufthansa AG" />
              </div>
              <div className="grade-campos-2">
                <div className="grupo-campo">
                  <label className="rotulo">Data de Início</label>
                  <input className="campo-input" type="date" />
                </div>
                <div className="grupo-campo">
                  <label className="rotulo">Entrega Prevista</label>
                  <input className="campo-input" type="date" />
                </div>
              </div>
              <div className="grupo-campo">
                <label className="rotulo">Prioridade</label>
                <select className="campo-select">
                  <option>Normal</option>
                  <option>Alta</option>
                  <option>Crítica</option>
                </select>
              </div>
              <div className="grupo-campo">
                <label className="rotulo">Observações Iniciais</label>
                <textarea className="campo-textarea" rows={3} placeholder="Detalhes e especificações da ordem..." />
              </div>
            </div>
            <div className="modal-rodape">
              <button className="btn btn-secundario" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn btn-primario" onClick={() => setMostrarModal(false)}>
                <i className="fa-solid fa-check"></i> Criar Ordem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

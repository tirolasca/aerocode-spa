import { useState } from 'react';
import {
  ordens, pecas, funcionarios,
  StatusEtapa, StatusPeca, TipoTeste, ResultadoTeste,
  labelStatusEtapa, labelStatusPeca, labelTipoTeste, labelResultadoTeste,
} from '../dados/dadosMock';

function statusOrdem(ordem) {
  const etapas = ordem.etapas || [];
  if (etapas.length === 0) return 'Planejado';
  if (etapas.every(e => e.status === StatusEtapa.CONCLUIDA)) return 'Concluído';
  if (etapas.some(e => e.status === StatusEtapa.ANDAMENTO)) return 'Em Produção';
  return 'Planejado';
}

function progressoEtapa(status) {
  if (status === StatusEtapa.CONCLUIDA) return 100;
  if (status === StatusEtapa.ANDAMENTO) return 50;
  return 0;
}

function buscarPeca(id) {
  return pecas.find(p => p.id === id) || null;
}

function buscarFuncionario(id) {
  return funcionarios.find(f => f.id === id) || null;
}

function BadgeStatus({ status }) {
  const mapa = { 'Em Produção':'badge-info', 'Concluído':'badge-sucesso', 'Planejado':'badge-neutro' };
  return <span className={`badge ${mapa[status] || 'badge-neutro'}`}>{status}</span>;
}

function BadgePrioridade({ prioridade }) {
  const mapa = { 'Crítica':'badge-perigo', 'Alta':'badge-aviso', 'Normal':'badge-neutro' };
  return <span className={`badge ${mapa[prioridade] || 'badge-neutro'}`}>{prioridade}</span>;
}

function BadgeFase({ status }) {
  const mapa = {
    [StatusEtapa.CONCLUIDA]: 'badge-sucesso',
    [StatusEtapa.ANDAMENTO]: 'badge-info',
    [StatusEtapa.PENDENTE]:  'badge-neutro',
  };
  return (
    <span className={`badge ${mapa[status] || 'badge-neutro'}`} style={{ fontSize:'10.5px', padding:'2px 8px' }}>
      {labelStatusEtapa[status] || status}
    </span>
  );
}

function BadgePeca({ status }) {
  const mapa = {
    [StatusPeca.PRONTA]:        'badge-sucesso',
    [StatusPeca.EM_TRANSPORTE]: 'badge-aviso',
    [StatusPeca.EM_PRODUCAO]:   'badge-perigo',
  };
  return (
    <span className={`badge ${mapa[status] || 'badge-neutro'}`} style={{ fontSize:'10.5px', padding:'2px 8px' }}>
      {labelStatusPeca[status] || status}
    </span>
  );
}

function BadgeTeste({ resultado }) {
  if (resultado === null || resultado === undefined) {
    return <span className="badge badge-neutro" style={{ fontSize:'10.5px', padding:'2px 8px' }}>Pendente</span>;
  }
  const mapa = {
    [ResultadoTeste.APROVADO]:  'badge-sucesso',
    [ResultadoTeste.REPROVADO]: 'badge-perigo',
  };
  return (
    <span className={`badge ${mapa[resultado] || 'badge-neutro'}`} style={{ fontSize:'10.5px', padding:'2px 8px' }}>
      {labelResultadoTeste[resultado] || resultado}
    </span>
  );
}

function DetalheOrdem({ ordem, aoVoltar }) {
  const etapas    = ordem.etapas    || [];
  const pecasOrdem = (ordem.pecasIds || []).map(buscarPeca).filter(Boolean);
  const historico = ordem.historico  || [];
  const testes    = ordem.testes     || [];

  return (
    <div className="deslizar-entrada">
      <div className="cabecalho-pagina">
        <div className="titulo-area">
          <div className="migalhas">
            <span className="migalhas-link" onClick={aoVoltar}>
              <i className="fa-solid fa-clipboard-list"></i> Ordens de Produção
            </span>
            <i className="fa-solid fa-chevron-right" style={{ fontSize:'10px' }}></i>
            <span>{ordem.id}</span>
          </div>
          <h2 className="titulo-principal">{ordem.id} — {ordem.modelo}</h2>
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
          ['fa-calendar-plus',  'Início',          ordem.inicio],
          ['fa-calendar-check', 'Entrega Prevista', ordem.entrega],
          ['fa-flag',           'Prioridade',       ordem.prioridade],
          ['fa-circle-info',    'Status',           statusOrdem(ordem)],
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
              <i className="fa-solid fa-list-check"></i> Etapas de Produção
            </span>
          </div>
          <div className="cartao-corpo">
            {etapas.length > 0 ? etapas.map((etapa, i) => (
              <div key={i} className="linha-fase">
                <span className="fase-nome">{etapa.nome}</span>
                <div className="fase-barra">
                  <div className="barra-progresso-fundo barra-progresso-sm">
                    <div className="barra-progresso-fill" style={{ width:`${progressoEtapa(etapa.status)}%` }} />
                  </div>
                </div>
                <span className="fase-pct">{progressoEtapa(etapa.status)}%</span>
                <BadgeFase status={etapa.status} />
              </div>
            )) : (
              <div className="estado-vazio">
                <div className="estado-vazio-icone"><i className="fa-solid fa-list-check"></i></div>
                <p>Sem etapas cadastradas.</p>
              </div>
            )}
          </div>
        </div>

        <div className="cartao">
          <div className="cartao-cabecalho">
            <span className="cartao-titulo">
              <i className="fa-solid fa-gears"></i> Peças Associadas
            </span>
          </div>
          <div className="container-tabela">
            <table>
              <thead>
                <tr><th>Peça</th><th>Fornecedor</th><th>Status</th></tr>
              </thead>
              <tbody>
                {pecasOrdem.length > 0 ? pecasOrdem.map((p, i) => (
                  <tr key={i}>
                    <td>{p.nome}</td>
                    <td className="texto-secundario texto-sm">{p.fornecedor}</td>
                    <td><BadgePeca status={p.status} /></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="celula-vazia">Sem peças registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {testes.length > 0 && (
        <div className="cartao" style={{ marginBottom: 16 }}>
          <div className="cartao-cabecalho">
            <span className="cartao-titulo">
              <i className="fa-solid fa-flask"></i> Testes Realizados
            </span>
          </div>
          <div className="container-tabela">
            <table>
              <thead>
                <tr><th>Tipo</th><th>Resultado</th></tr>
              </thead>
              <tbody>
                {testes.map((teste, i) => (
                  <tr key={i}>
                    <td>{labelTipoTeste[teste.tipo] || teste.tipo}</td>
                    <td><BadgeTeste resultado={teste.resultado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
          {historico.length > 0 ? historico.map((nota, i) => {
            const func = buscarFuncionario(nota.autorId);
            const nomeAutor = func ? func.nome : `Funcionário #${nota.autorId}`;
            const iniciais = nomeAutor.split(' ').map(x => x[0]).slice(0, 2).join('');
            return (
              <div key={i} className="item-historico">
                <div className="historico-avatar">{iniciais}</div>
                <div>
                  <div className="historico-autor">
                    {nomeAutor}{' '}
                    <span className="historico-data">— {nota.data}</span>
                  </div>
                  <p className="historico-texto">{nota.texto}</p>
                </div>
              </div>
            );
          }) : (
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
  const [busca,            setBusca]            = useState('');
  const [filtro,           setFiltro]           = useState('Todos');
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);
  const [mostrarModal,     setMostrarModal]     = useState(false);

  if (ordemSelecionada) {
    return <DetalheOrdem ordem={ordemSelecionada} aoVoltar={() => setOrdemSelecionada(null)} />;
  }

  const ordensFiltradas = ordens.filter(o => {
    const st = statusOrdem(o);
    const bateBusca  = o.id.toLowerCase().includes(busca.toLowerCase()) ||
                       o.modelo.toLowerCase().includes(busca.toLowerCase()) ||
                       o.cliente.toLowerCase().includes(busca.toLowerCase());
    const bateFiltro = filtro === 'Todos' || st === filtro;
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
            placeholder="Buscar por número, modelo ou cliente..."
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
                <th>Nº Ordem</th><th>Modelo</th><th>Tipo</th><th>Cliente</th>
                <th>Início</th><th>Entrega</th><th>Progresso</th>
                <th>Prioridade</th><th>Status</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ordensFiltradas.map(ordem => {
                const st = statusOrdem(ordem);
                return (
                  <tr key={ordem.id}>
                    <td><strong className="texto-primario">{ordem.id}</strong></td>
                    <td><span className="texto-negrito">{ordem.modelo}</span></td>
                    <td>
                      <span className="badge badge-neutro" style={{ fontSize:'10.5px' }}>
                        {ordem.tipo === 'MILITAR' ? 'Militar' : 'Comercial'}
                      </span>
                    </td>
                    <td className="texto-secundario">{ordem.cliente}</td>
                    <td className="texto-secundario texto-sm">{ordem.inicio}</td>
                    <td className="texto-secundario texto-sm">{ordem.entrega}</td>
                    <td className="coluna-progresso">
                      <div className="barra-progresso-container-inline">
                        <div className="barra-progresso-fundo barra-progresso-sm" style={{ flex:1 }}>
                          <div className="barra-progresso-fill" style={{ width:`${ordem.progresso}%` }} />
                        </div>
                        <span className="barra-progresso-texto">{ordem.progresso}%</span>
                      </div>
                    </td>
                    <td><BadgePrioridade prioridade={ordem.prioridade} /></td>
                    <td><BadgeStatus status={st} /></td>
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
                );
              })}
              {ordensFiltradas.length === 0 && (
                <tr>
                  <td colSpan={10} className="celula-vazia">
                    <i className="fa-solid fa-magnifying-glass"></i> Nenhuma ordem encontrada.
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
                <label className="rotulo">Tipo</label>
                <select className="campo-select">
                  <option value="COMERCIAL">Comercial</option>
                  <option value="MILITAR">Militar</option>
                </select>
              </div>
              <div className="grupo-campo">
                <label className="rotulo">Cliente</label>
                <input className="campo-input" placeholder="ex: Lufthansa AG" />
              </div>
              <div className="grade-campos-2">
                <div className="grupo-campo">
                  <label className="rotulo">Capacidade (passageiros)</label>
                  <input className="campo-input" type="number" placeholder="ex: 180" />
                </div>
                <div className="grupo-campo">
                  <label className="rotulo">Alcance (km)</label>
                  <input className="campo-input" type="number" placeholder="ex: 6150" />
                </div>
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
                  <option>Normal</option><option>Alta</option><option>Crítica</option>
                </select>
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

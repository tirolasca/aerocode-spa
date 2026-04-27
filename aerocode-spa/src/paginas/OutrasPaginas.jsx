import { useState } from 'react';
import { inspecoesQualidade, itensChecklist, componentes, usuarios, producaoMensal } from '../dados/dadosMock';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
function BadgeResultado({ resultado }) {
  const mapa = { 'Aprovado':'badge-sucesso','Reprovado':'badge-perigo','Pendente':'badge-aviso' };
  return <span className={`badge ${mapa[resultado]||'badge-neutro'}`}>{resultado}</span>;
}

export function PaginaQualidade() {
  const [filtro, setFiltro] = useState('Todas');
  const [busca, setBusca] = useState('');
  const [inspecaoAtiva, setInspecaoAtiva] = useState(null);
  const [marcacoes, setMarcacoes] = useState(itensChecklist.map((_, i) => i < 5));
  const [mostrarModal, setMostrarModal] = useState(false);

  const inspecoesFiltradas = inspecoesQualidade.filter(ins => {
    const bateBusca = ins.id.includes(busca) || ins.aeronave.toLowerCase().includes(busca.toLowerCase()) || ins.ordemId.includes(busca);
    const bateFiltro = filtro === 'Todas' || ins.resultado === filtro;
    return bateBusca && bateFiltro;
  });

  function alternarMarcacao(i) {
    setMarcacoes(prev => prev.map((v, j) => j === i ? !v : v));
  }

  return (
    <div className="fade-entrada">
      <div className="cabecalho-pagina">
        <div className="titulo-area">
          <h2 className="titulo-principal">Controle de Qualidade</h2>
          <p className="subtitulo-pagina">
            <i className="fa-solid fa-shield-halved"></i> Inspeções técnicas e aprovações normativas
          </p>
        </div>
        <button className="btn btn-primario" onClick={() => setMostrarModal(true)}>
          <i className="fa-solid fa-plus"></i> Nova Inspeção
        </button>
      </div>

      <div className="grade-kpi-3col">
        {[
          { rotulo:'Aprovadas', valor: inspecoesQualidade.filter(i=>i.resultado==='Aprovado').length, classe:'badge-sucesso', icone:'fa-circle-check' },
          { rotulo:'Pendentes', valor: inspecoesQualidade.filter(i=>i.resultado==='Pendente').length, classe:'badge-aviso', icone:'fa-clock' },
          { rotulo:'Reprovadas', valor: inspecoesQualidade.filter(i=>i.resultado==='Reprovado').length, classe:'badge-perigo', icone:'fa-circle-xmark' },
        ].map(({ rotulo, valor, classe, icone }) => (
          <div key={rotulo} className="cartao cartao-kpi-qualidade">
            <div className="kqi-icone">
              <i className={`fa-solid ${icone}`}></i>
            </div>
            <div>
              <div className="kqi-rotulo">{rotulo}</div>
              <span className={`badge ${classe} kqi-valor`}>{valor}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="barra-ferramentas">
        <div className="barra-busca">
          <i className="fa-solid fa-magnifying-glass barra-busca-icone"></i>
          <input className="barra-busca-input" placeholder="Buscar inspeção..." value={busca} onChange={e => setBusca(e.target.value)} />
        </div>
        <div className="abas">
          {['Todas','Aprovado','Pendente','Reprovado'].map(f => (
            <button key={f} className={`aba${filtro===f?' ativa':''}`} onClick={() => setFiltro(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grade-qualidade-layout">
        <div className="cartao">
          <div className="container-tabela">
            <table>
              <thead>
                <tr><th>ID Inspeção</th><th>Ordem</th><th>Aeronave</th><th>Inspetor</th><th>Fase</th><th>Data</th><th>Resultado</th><th>Ação</th></tr>
              </thead>
              <tbody>
                {inspecoesFiltradas.map(ins => (
                  <tr key={ins.id} onClick={() => setInspecaoAtiva(ins)} className="linha-clicavel">
                    <td><strong className="texto-primario">{ins.id}</strong></td>
                    <td>{ins.ordemId}</td>
                    <td>{ins.aeronave}</td>
                    <td className="texto-secundario">{ins.inspetor}</td>
                    <td>{ins.fase}</td>
                    <td className="texto-secundario texto-sm">{ins.data}</td>
                    <td><BadgeResultado resultado={ins.resultado} /></td>
                    <td>
                      <button className="btn btn-secundario btn-sm" onClick={e => { e.stopPropagation(); setInspecaoAtiva(ins); }}>
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {inspecoesFiltradas.length === 0 && (
                  <tr><td colSpan={8} className="celula-vazia">Nenhuma inspeção encontrada.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {inspecaoAtiva && (
          <div className="cartao painel-checklist deslizar-entrada">
            <div className="cartao-cabecalho">
              <span className="cartao-titulo"><i className="fa-solid fa-list-check"></i> {inspecaoAtiva.id}</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setInspecaoAtiva(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="cartao-corpo">
              <div className="info-inspecao-header">
                <strong>{inspecaoAtiva.aeronave}</strong> · {inspecaoAtiva.fase}<br/>
                <span className="texto-secundario texto-sm">Inspetor: {inspecaoAtiva.inspetor}</span>
              </div>
              <div className="secao-checklist">
                <div className="checklist-titulo">
                  <i className="fa-solid fa-clipboard-check"></i> Checklist Normativo
                  <span className="checklist-contador">
                    {marcacoes.filter(Boolean).length}/{marcacoes.length}
                  </span>
                </div>
                {itensChecklist.map((item, i) => (
                  <div key={i} className="item-checklist" onClick={() => alternarMarcacao(i)}>
                    <div className={`caixa-check${marcacoes[i] ? ' marcado' : ''}`}>
                      {marcacoes[i] && <i className="fa-solid fa-check"></i>}
                    </div>
                    <span className={marcacoes[i] ? 'item-check-marcado' : 'item-check-pendente'}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="secao-assinatura">
                <div className="assinatura-titulo"><i className="fa-solid fa-signature"></i> Assinatura Digital</div>
                <div className="area-assinatura">
                  <i className="fa-regular fa-pen-to-square"></i>
                  <span>Área de Assinatura</span>
                  <small>Eng. responsável assina aqui</small>
                </div>
                <div className="grade-campos-2">
                  <button className="btn btn-sucesso btn-sm">
                    <i className="fa-solid fa-check"></i> Aprovar
                  </button>
                  <button className="btn btn-perigo btn-sm">
                    <i className="fa-solid fa-xmark"></i> Reprovar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {mostrarModal && (
        <div className="fundo-modal" onClick={() => setMostrarModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-cabecalho">
              <span className="modal-titulo"><i className="fa-solid fa-plus-circle"></i> Nova Inspeção de Qualidade</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setMostrarModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="modal-corpo">
              <div className="grupo-campo">
                <label className="rotulo">Ordem de Produção</label>
                <select className="campo-select"><option>AC-1041 — Airbus A320</option><option>AC-1042 — Boeing 737 MAX</option><option>AC-1046 — Boeing 787-9</option></select>
              </div>
              <div className="grupo-campo">
                <label className="rotulo">Fase de Inspeção</label>
                <select className="campo-select"><option>Estrutura</option><option>Hidráulica</option><option>Elétrica</option><option>Aviônica</option><option>Interior</option><option>Certificação</option></select>
              </div>
              <div className="grupo-campo">
                <label className="rotulo">Inspetor Responsável</label>
                <select className="campo-select"><option>Eng. Carlos Silva</option><option>Eng. Fernanda Torres</option><option>Eng. Ricardo Lima</option><option>Eng. Ana Souza</option></select>
              </div>
              <div className="grupo-campo">
                <label className="rotulo">Observações</label>
                <textarea className="campo-textarea" rows={3} placeholder="Detalhes sobre a inspeção..." />
              </div>
            </div>
            <div className="modal-rodape">
              <button className="btn btn-secundario" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn btn-primario" onClick={() => setMostrarModal(false)}><i className="fa-solid fa-check"></i> Criar Inspeção</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapaStatusComp = { 'Estoque OK':'badge-sucesso','Estoque Baixo':'badge-aviso','Crítico':'badge-perigo' };

export function PaginaComponentes() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');

  const categorias = ['Todos', ...new Set(componentes.map(c => c.categoria))];
  const compFiltrados = componentes.filter(c => {
    const bateBusca = c.nome.toLowerCase().includes(busca.toLowerCase()) || c.fornecedor.toLowerCase().includes(busca.toLowerCase());
    const bateFiltro = filtro === 'Todos' || c.categoria === filtro;
    return bateBusca && bateFiltro;
  });

  return (
    <div className="fade-entrada">
      <div className="cabecalho-pagina">
        <div className="titulo-area">
          <h2 className="titulo-principal">Componentes</h2>
          <p className="subtitulo-pagina"><i className="fa-solid fa-gears"></i> Inventário e rastreabilidade</p>
        </div>
        <button className="btn btn-primario"><i className="fa-solid fa-plus"></i> Novo Componente</button>
      </div>

      <div className="grade-kpi-3col">
        {[
          { rotulo:'Total de Itens', valor:componentes.length, icone:'fa-boxes-stacked', cor:'#dbeafe' },
          { rotulo:'Estoque Baixo', valor:componentes.filter(c=>c.status==='Estoque Baixo').length, icone:'fa-exclamation-triangle', cor:'#fef3c7' },
          { rotulo:'Itens Críticos', valor:componentes.filter(c=>c.status==='Crítico').length, icone:'fa-circle-exclamation', cor:'#ffe4e6' },
        ].map(({ rotulo, valor, icone }) => (
          <div key={rotulo} className="cartao kpi-comp-card">
            <div className="kqi-icone"><i className={`fa-solid ${icone}`}></i></div>
            <div>
              <div className="kqi-rotulo">{rotulo}</div>
              <div className="cartao-info-valor">{valor}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="barra-ferramentas">
        <div className="barra-busca">
          <i className="fa-solid fa-magnifying-glass barra-busca-icone"></i>
          <input className="barra-busca-input" placeholder="Buscar componente ou fornecedor..." value={busca} onChange={e => setBusca(e.target.value)} />
        </div>
        <div className="abas">
          {categorias.map(c => (
            <button key={c} className={`aba${filtro===c?' ativa':''}`} onClick={() => setFiltro(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="cartao">
        <div className="container-tabela">
          <table>
            <thead>
              <tr><th>ID</th><th>Componente</th><th>Categoria</th><th>Total</th><th>Disponíveis</th><th>Fornecedor</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {compFiltrados.map(c => (
                <tr key={c.id}>
                  <td><strong className="texto-primario texto-sm">{c.id}</strong></td>
                  <td><span className="texto-negrito">{c.nome}</span></td>
                  <td><span className="badge badge-neutro texto-xs">{c.categoria}</span></td>
                  <td><strong>{c.quantidade}</strong></td>
                  <td>
                    <span className={c.disponivel < 3 ? 'texto-perigo texto-negrito' : c.disponivel < 5 ? 'texto-aviso texto-negrito' : 'texto-sucesso texto-negrito'}>
                      {c.disponivel}
                    </span>
                  </td>
                  <td className="texto-secundario texto-sm">{c.fornecedor}</td>
                  <td><span className={`badge ${mapaStatusComp[c.status]||'badge-neutro'}`}>{c.status}</span></td>
                  <td>
                    <div className="grupo-acoes">
                      <button className="btn btn-secundario btn-sm"><i className="fa-solid fa-pen-to-square"></i></button>
                      <button className="btn btn-secundario btn-sm texto-perigo"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const CORES_PIZZA = ['#1a3a6b','#3a86ff','#f59e0b','#1a8754'];
const dadosPizza = [
  { nome:'Em Produção', valor:38 },
  { nome:'Planejado',   valor:22 },
  { nome:'Controle Q.', valor:8  },
  { nome:'Concluído',   valor:32 },
];
const dadosGraficoQual2 = producaoMensal.map((m, i) => ({
  ...m,
  taxa: [97.2,98.1,97.8,98.5,98.2,99.0,98.7,99.1,98.9,99.3,98.8,99.2][i]
}));
const desempenhoEngenheiros = [
  ['Eng. Carlos Silva', 12, '99.1%', '100%'],
  ['Eng. Fernanda Torres', 9, '98.5%', '89%'],
  ['Eng. Ricardo Lima', 11, '97.8%', '91%'],
  ['Eng. Ana Souza', 8, '99.5%', '100%'],
  ['Eng. Paulo Nunes', 7, '96.2%', '85%'],
];

export function PaginaRelatorios() {
  const [periodo, setPeriodo] = useState('Mês');
  return (
    <div className="fade-entrada">
      <div className="cabecalho-pagina">
        <div className="titulo-area">
          <h2 className="titulo-principal">Relatórios e Analytics</h2>
          <p className="subtitulo-pagina"><i className="fa-solid fa-chart-line"></i> Indicadores de performance da produção</p>
        </div>
        <button className="btn btn-secundario">
          <i className="fa-solid fa-file-pdf"></i> Exportar PDF
        </button>
      </div>

      <div className="barra-ferramentas">
        <span className="rotulo-periodo"><i className="fa-solid fa-calendar-days"></i> Período:</span>
        <div className="abas">
          {['Semana','Mês','Trimestre','Ano'].map(p => (
            <button key={p} className={`aba${periodo===p?' ativa':''}`} onClick={() => setPeriodo(p)}>{p}</button>
          ))}
        </div>
      </div>

      <div className="grade-graficos">
        <div className="cartao">
          <div className="cartao-cabecalho">
            <span className="cartao-titulo"><i className="fa-solid fa-chart-bar"></i> Aeronaves Concluídas vs Planejadas</span>
          </div>
          <div className="cartao-corpo">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={producaoMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eef5" vertical={false} />
                <XAxis dataKey="mes" tick={{fontSize:11}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={{borderRadius:8,fontSize:12,border:'1px solid #d0dce8'}} />
                <Legend wrapperStyle={{fontSize:12}} />
                <Bar dataKey="concluidas" name="Concluídas" fill="#1a3a6b" radius={[4,4,0,0]} />
                <Bar dataKey="planejadas" name="Planejadas" fill="#5b9cf6" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="cartao">
          <div className="cartao-cabecalho">
            <span className="cartao-titulo"><i className="fa-solid fa-chart-pie"></i> Status das Ordens Ativas</span>
          </div>
          <div className="cartao-corpo grafico-pizza-layout">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={dadosPizza} cx={70} cy={70} innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="valor" nameKey="nome">
                  {dadosPizza.map((_, i) => <Cell key={i} fill={CORES_PIZZA[i]} />)}
                </Pie>
                <Tooltip
                  formatter={(valor, _nome, props) => [`${valor}%`, props.payload.nome]}
                  contentStyle={{
                    borderRadius: 10,
                    fontSize: 12,
                    border: '1px solid #d0dce8',
                    boxShadow: '0 4px 18px rgba(26,58,107,0.13)',
                    padding: '8px 14px',
                  }}
                  itemStyle={{ color: '#1a1a2e', fontWeight: 600 }}
                  labelStyle={{ display: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="legenda-pizza">
              {dadosPizza.map((d, i) => (
                <div key={d.nome} className="legenda-pizza-item">
                  <div className="legenda-cor" style={{background:CORES_PIZZA[i]}} />
                  <span className="legenda-nome">{d.nome}</span>
                  <span className="legenda-pct">{d.valor}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cartao cartao-mb">
        <div className="cartao-cabecalho">
          <span className="cartao-titulo"><i className="fa-solid fa-shield-halved"></i> Taxa de Qualidade Mensal (%)</span>
        </div>
        <div className="cartao-corpo">
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={dadosGraficoQual2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8eef5" vertical={false} />
              <XAxis dataKey="mes" tick={{fontSize:11}} axisLine={false} tickLine={false} />
              <YAxis domain={[96,100]} tick={{fontSize:11}} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={{borderRadius:8,fontSize:12}} />
              <Line dataKey="taxa" name="Taxa %" stroke="#1a8754" strokeWidth={2.5} dot={{r:3,fill:'#1a8754'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="cartao">
        <div className="cartao-cabecalho">
          <span className="cartao-titulo"><i className="fa-solid fa-users"></i> Desempenho por Engenheiro</span>
        </div>
        <div className="container-tabela">
          <table>
            <thead>
              <tr><th>Engenheiro</th><th>Ordens Gerenciadas</th><th>Taxa de Qualidade</th><th>No Prazo</th></tr>
            </thead>
            <tbody>
              {desempenhoEngenheiros.map(([nome, qtd, qual, prazo]) => (
                <tr key={nome}>
                  <td className="texto-negrito">{nome}</td>
                  <td><strong className="texto-primario">{qtd}</strong></td>
                  <td><span className="texto-sucesso texto-negrito">{qual}</span></td>
                  <td>
                    <span className={parseInt(prazo) < 90 ? 'texto-aviso texto-negrito' : 'texto-sucesso texto-negrito'}>
                      {prazo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PaginaUsuarios() {
  const [busca, setBusca] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const usuariosFiltrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(busca.toLowerCase()) ||
    u.email.toLowerCase().includes(busca.toLowerCase()) ||
    u.funcao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="fade-entrada">
      <div className="cabecalho-pagina">
        <div className="titulo-area">
          <h2 className="titulo-principal">Usuários</h2>
          <p className="subtitulo-pagina"><i className="fa-solid fa-users"></i> {usuarios.length} usuários cadastrados</p>
        </div>
        <button className="btn btn-primario" onClick={() => setMostrarModal(true)}>
          <i className="fa-solid fa-user-plus"></i> Novo Usuário
        </button>
      </div>

      <div className="barra-ferramentas">
        <div className="barra-busca">
          <i className="fa-solid fa-magnifying-glass barra-busca-icone"></i>
          <input className="barra-busca-input" placeholder="Buscar usuário, e-mail ou função..." value={busca} onChange={e => setBusca(e.target.value)} />
        </div>
      </div>

      <div className="cartao">
        <div className="container-tabela">
          <table>
            <thead>
              <tr><th>Nome</th><th>E-mail</th><th>Função</th><th>Departamento</th><th>Ordens</th><th>Status</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="usuario-tabela-nome">
                      <div className="avatar-pequeno">
                        {u.nome.split(' ').map(x=>x[0]).slice(0,2).join('')}
                      </div>
                      <span className="texto-negrito">{u.nome}</span>
                    </div>
                  </td>
                  <td className="texto-secundario texto-sm">{u.email}</td>
                  <td className="texto-sm">{u.funcao}</td>
                  <td><span className="badge badge-neutro texto-xs">{u.departamento}</span></td>
                  <td><strong className="texto-primario">{u.ordens}</strong></td>
                  <td><span className="badge badge-sucesso">{u.status}</span></td>
                  <td>
                    <div className="grupo-acoes">
                      <button className="btn btn-secundario btn-sm"><i className="fa-solid fa-pen-to-square"></i></button>
                      <button className="btn btn-secundario btn-sm texto-perigo"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && (
        <div className="fundo-modal" onClick={() => setMostrarModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-cabecalho">
              <span className="modal-titulo"><i className="fa-solid fa-user-plus"></i> Novo Usuário</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setMostrarModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="modal-corpo">
              <div className="grade-campos-2">
                <div className="grupo-campo"><label className="rotulo">Nome</label><input className="campo-input" placeholder="Nome" /></div>
                <div className="grupo-campo"><label className="rotulo">Sobrenome</label><input className="campo-input" placeholder="Sobrenome" /></div>
              </div>
              <div className="grupo-campo"><label className="rotulo">E-mail corporativo</label><input className="campo-input" type="email" placeholder="email@aerocode.com" /></div>
              <div className="grupo-campo"><label className="rotulo">Função</label>
                <select className="campo-select">
                  <option>Engenheiro de Produção</option>
                  <option>Engenheiro Aeronáutico</option>
                  <option>Inspetor de Qualidade</option>
                  <option>Gerente de Operações</option>
                  <option>Administrador</option>
                </select>
              </div>
              <div className="grupo-campo"><label className="rotulo">Departamento</label>
                <select className="campo-select">
                  <option>Produção</option><option>Engenharia</option><option>Qualidade</option><option>Gestão</option><option>TI</option>
                </select>
              </div>
            </div>
            <div className="modal-rodape">
              <button className="btn btn-secundario" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn btn-primario" onClick={() => setMostrarModal(false)}><i className="fa-solid fa-check"></i> Criar Usuário</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PaginaConfiguracoes() {
  return (
    <div className="fade-entrada">
      <div className="cabecalho-pagina">
        <div className="titulo-area">
          <h2 className="titulo-principal">Configurações</h2>
          <p className="subtitulo-pagina"><i className="fa-solid fa-sliders"></i> Preferências e informações do sistema</p>
        </div>
      </div>
      <div className="grade-configuracoes">
        <div className="cartao menu-configuracoes">
          {['Geral','Notificações','Segurança','Integrações','Sobre o Sistema'].map((item, i) => (
            <div key={item} className={`item-menu-config${i===0?' ativo':''}`}>
              <i className={`fa-solid ${['fa-sliders','fa-bell','fa-lock','fa-plug','fa-circle-info'][i]}`}></i>
              {item}
            </div>
          ))}
        </div>
        <div className="conteudo-configuracoes">
          <div className="cartao cartao-mb">
            <div className="cartao-cabecalho">
              <span className="cartao-titulo"><i className="fa-solid fa-sliders"></i> Configurações Gerais</span>
            </div>
            <div className="cartao-corpo">
              <div className="grupo-campo"><label className="rotulo">Nome da Empresa</label><input className="campo-input" defaultValue="Aerocode Sistemas" /></div>
              <div className="grupo-campo"><label className="rotulo">Fuso Horário</label>
                <select className="campo-select">
                  <option>America/Sao_Paulo (GMT-3)</option>
                  <option>Europe/London (GMT)</option>
                  <option>Asia/Tokyo (GMT+9)</option>
                </select>
              </div>
              <div className="grupo-campo"><label className="rotulo">Idioma</label>
                <select className="campo-select">
                  <option>Português (Brasil)</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>
              <button className="btn btn-primario"><i className="fa-solid fa-floppy-disk"></i> Salvar Configurações</button>
            </div>
          </div>
          <div className="cartao">
            <div className="cartao-cabecalho">
              <span className="cartao-titulo"><i className="fa-solid fa-circle-info"></i> Informações do Sistema</span>
            </div>
            <div className="cartao-corpo">
              {[
                ['Versão','1.0.0 (Protótipo)'],
                ['Framework','React 18 + Vite 6'],
                ['Ambiente','Desenvolvimento'],
                ['Última atualização','Abril / 2026'],
                ['Plataformas suportadas','Windows 10+, Ubuntu 24.04+'],
                ['Suporte','suporte@aerocode.com'],
              ].map(([chave, valor]) => (
                <div key={chave} className="linha-info-sistema">
                  <span className="info-chave">{chave}</span>
                  <span className="info-valor">{valor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
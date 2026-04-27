// ── dadosMock.js — Dados simulados do sistema Aerocode ────────────────────────

export const usuarioAtual = {
  id: 1,
  nome: 'Carlos Silva',
  cargo: 'Engenheiro de Produção',
  iniciais: 'CS',
  email: 'carlos.silva@aerocode.com',
  departamento: 'Produção',
};

export const ordens = [
  { id:'AC-1041', aeronave:'Airbus A320', cliente:'Lufthansa AG', inicio:'02/01/2026', entrega:'30/06/2026', progresso:78, status:'Em Produção', prioridade:'Alta' },
  { id:'AC-1042', aeronave:'Boeing 737 MAX', cliente:'Ryanair Ltd', inicio:'15/01/2026', entrega:'15/08/2026', progresso:45, status:'Em Produção', prioridade:'Alta' },
  { id:'AC-1043', aeronave:'Embraer E175', cliente:'LATAM Airlines', inicio:'20/11/2025', entrega:'28/02/2026', progresso:100, status:'Concluído', prioridade:'Normal' },
  { id:'AC-1044', aeronave:'Gulfstream G550', cliente:'NetJets Inc.', inicio:'05/02/2026', entrega:'20/09/2026', progresso:15, status:'Planejado', prioridade:'Normal' },
  { id:'AC-1045', aeronave:'Dassault Falcon 7X', cliente:'Dassault Aviation', inicio:'10/02/2026', entrega:'10/10/2026', progresso:5, status:'Planejado', prioridade:'Alta' },
  { id:'AC-1046', aeronave:'Boeing 787-9', cliente:'Emirates Airlines', inicio:'01/03/2026', entrega:'01/12/2026', progresso:8, status:'Em Produção', prioridade:'Crítica' },
  { id:'AC-1047', aeronave:'Airbus A350-900', cliente:'Singapore Airlines', inicio:'15/03/2026', entrega:'15/01/2027', progresso:3, status:'Planejado', prioridade:'Normal' },
  { id:'AC-1048', aeronave:'Lockheed C-130J', cliente:'BAE Systems', inicio:'20/03/2026', entrega:'20/02/2027', progresso:12, status:'Em Produção', prioridade:'Alta' },
];

export const detalheOrdens = {
  'AC-1041': {
    fases: [
      { nome:'Estrutura da Fuselagem', progresso:100, status:'Concluído' },
      { nome:'Sistemas Hidráulicos', progresso:100, status:'Concluído' },
      { nome:'Eletricidade e Aviônica', progresso:82, status:'Em Produção' },
      { nome:'Acabamento Interior', progresso:60, status:'Em Produção' },
      { nome:'Testes e Inspeções', progresso:15, status:'Em Produção' },
      { nome:'Certificação Final', progresso:0, status:'Pendente' },
    ],
    componentes: [
      { nome:'Motor CFM56-5B', quantidade:2, status:'Instalado', fornecedor:'CFM International' },
      { nome:'Trem de Pouso Principal', quantidade:2, status:'Instalado', fornecedor:'Safran Landing' },
      { nome:'Superfícies de Voo', quantidade:8, status:'Instalado', fornecedor:'Airbus SAS' },
      { nome:'Sistema FMS Aviônica', quantidade:1, status:'Aguardando', fornecedor:'Honeywell' },
      { nome:'Assentos Econômica 150', quantidade:150, status:'Em Fabricação', fornecedor:'Recaro Aircraft' },
      { nome:'APU GTCP131-9', quantidade:1, status:'Instalado', fornecedor:'Honeywell' },
    ],
    historico: [
      { data:'12/04/2026', autor:'Eng. Carlos Silva', texto:'Inspeção parcial concluída. Aviônica aguardando entrega do fornecedor Honeywell prevista para 20/04.' },
      { data:'05/04/2026', autor:'Eng. Fernanda Torres', texto:'Sistema hidráulico validado conforme norma AS9100. Aprovado para prosseguimento da fase de elétrica.' },
      { data:'28/03/2026', autor:'Eng. Ricardo Lima', texto:'Estrutura da fuselagem finalizada. Inspeção de raio-X realizada sem anomalias. Documentação arquivada.' },
    ]
  },
  'AC-1042': {
    fases: [
      { nome:'Estrutura da Fuselagem', progresso:100, status:'Concluído' },
      { nome:'Sistemas Hidráulicos', progresso:75, status:'Em Produção' },
      { nome:'Eletricidade e Aviônica', progresso:30, status:'Em Produção' },
      { nome:'Acabamento Interior', progresso:0, status:'Pendente' },
      { nome:'Testes e Inspeções', progresso:0, status:'Pendente' },
      { nome:'Certificação Final', progresso:0, status:'Pendente' },
    ],
    componentes: [
      { nome:'Motor CFM LEAP-1B', quantidade:2, status:'Instalado', fornecedor:'CFM International' },
      { nome:'Trem de Pouso Principal', quantidade:2, status:'Instalado', fornecedor:'Safran Landing' },
      { nome:'Flaps/Slats', quantidade:6, status:'Em Fabricação', fornecedor:'Spirit AeroSystems' },
    ],
    historico: [
      { data:'14/04/2026', autor:'Eng. Ricardo Lima', texto:'Inspeção estrutural em andamento. Hidráulica 75% completa.' },
    ]
  }
};

export const inspecoesQualidade = [
  { id:'INS-2041', ordemId:'AC-1041', aeronave:'A320 (Lufthansa)', inspetor:'Eng. Carlos Silva', data:'12/04/2026', fase:'Estrutura', resultado:'Aprovado' },
  { id:'INS-2042', ordemId:'AC-1041', aeronave:'A320 (Lufthansa)', inspetor:'Eng. Fernanda Torres', data:'13/04/2026', fase:'Hidráulica', resultado:'Aprovado' },
  { id:'INS-2043', ordemId:'AC-1042', aeronave:'B737 MAX (Ryanair)', inspetor:'Eng. Ricardo Lima', data:'14/04/2026', fase:'Estrutura', resultado:'Pendente' },
  { id:'INS-2044', ordemId:'AC-1043', aeronave:'E175 (LATAM)', inspetor:'Eng. Ana Souza', data:'14/04/2026', fase:'Certificação', resultado:'Reprovado' },
  { id:'INS-2045', ordemId:'AC-1044', aeronave:'G550 (NetJets)', inspetor:'Eng. Paulo Nunes', data:'15/04/2026', fase:'Estrutura', resultado:'Pendente' },
  { id:'INS-2046', ordemId:'AC-1041', aeronave:'A320 (Lufthansa)', inspetor:'Eng. Carlos Silva', data:'15/04/2026', fase:'Elétrica', resultado:'Aprovado' },
  { id:'INS-2047', ordemId:'AC-1046', aeronave:'B787-9 (Emirates)', inspetor:'Eng. Torres', data:'15/04/2026', fase:'Estrutura', resultado:'Pendente' },
];

export const itensChecklist = [
  'Inspeção visual da estrutura principal',
  'Verificação de torque dos parafusos críticos',
  'Teste de pressão do sistema hidráulico',
  'Verificação de sistemas elétricos e aviônica',
  'Inspeção de componentes de segurança',
  'Conformidade com normas AS9100/ISO 9001',
  'Documentação técnica completa e assinada',
  'Assinatura do engenheiro responsável',
];

export const componentes = [
  { id:'CMP-001', nome:'Motor CFM56-5B', categoria:'Propulsão', quantidade:12, disponivel:8, fornecedor:'CFM International', status:'Estoque OK' },
  { id:'CMP-002', nome:'Motor GE90-115B', categoria:'Propulsão', quantidade:6, disponivel:2, fornecedor:'GE Aviation', status:'Estoque Baixo' },
  { id:'CMP-003', nome:'Trem de Pouso Principal', categoria:'Estrutural', quantidade:20, disponivel:14, fornecedor:'Safran Landing', status:'Estoque OK' },
  { id:'CMP-004', nome:'Trem de Pouso Dianteiro', categoria:'Estrutural', quantidade:18, disponivel:12, fornecedor:'Safran Landing', status:'Estoque OK' },
  { id:'CMP-005', nome:'Sistema FMS Aviônica', categoria:'Aviônica', quantidade:8, disponivel:1, fornecedor:'Honeywell Aerospace', status:'Crítico' },
  { id:'CMP-006', nome:'Aileron Composto', categoria:'Aerodinâmica', quantidade:30, disponivel:22, fornecedor:'Spirit AeroSystems', status:'Estoque OK' },
  { id:'CMP-007', nome:'APU GTCP131-9', categoria:'Propulsão', quantidade:10, disponivel:7, fornecedor:'Honeywell', status:'Estoque OK' },
  { id:'CMP-008', nome:'Assento Passageiro Econ.', categoria:'Interior', quantidade:900, disponivel:350, fornecedor:'Recaro Aircraft', status:'Estoque Baixo' },
  { id:'CMP-009', nome:'Painel de Controle FCC', categoria:'Aviônica', quantidade:15, disponivel:11, fornecedor:'Collins Aerospace', status:'Estoque OK' },
  { id:'CMP-010', nome:'Compartimento de Carga', categoria:'Estrutural', quantidade:25, disponivel:18, fornecedor:'Ducommun Inc.', status:'Estoque OK' },
];

export const usuarios = [
  { id:1, nome:'Carlos Silva', email:'carlos.silva@aerocode.com', funcao:'Engenheiro de Produção', departamento:'Produção', status:'Ativo', ordens:12 },
  { id:2, nome:'Fernanda Torres', email:'f.torres@aerocode.com', funcao:'Engenheiro Aeronáutico', departamento:'Engenharia', status:'Ativo', ordens:9 },
  { id:3, nome:'Ricardo Lima', email:'r.lima@aerocode.com', funcao:'Inspetor de Qualidade', departamento:'Qualidade', status:'Ativo', ordens:11 },
  { id:4, nome:'Ana Souza', email:'a.souza@aerocode.com', funcao:'Engenheira de Qualidade', departamento:'Qualidade', status:'Ativo', ordens:8 },
  { id:5, nome:'Paulo Nunes', email:'p.nunes@aerocode.com', funcao:'Engenheiro de Produção', departamento:'Produção', status:'Ativo', ordens:7 },
  { id:6, nome:'Juliana Costa', email:'j.costa@aerocode.com', funcao:'Gerente de Operações', departamento:'Gestão', status:'Ativo', ordens:15 },
  { id:7, nome:'Marcos Oliveira', email:'m.oliveira@aerocode.com', funcao:'Administrador', departamento:'TI', status:'Ativo', ordens:0 },
];

export const producaoMensal = [
  { mes:'Jan', concluidas:8, planejadas:10 },
  { mes:'Fev', concluidas:11, planejadas:12 },
  { mes:'Mar', concluidas:9,  planejadas:11 },
  { mes:'Abr', concluidas:14, planejadas:13 },
  { mes:'Mai', concluidas:12, planejadas:14 },
  { mes:'Jun', concluidas:15, planejadas:14 },
  { mes:'Jul', concluidas:13, planejadas:15 },
  { mes:'Ago', concluidas:16, planejadas:16 },
  { mes:'Set', concluidas:13, planejadas:14 },
  { mes:'Out', concluidas:17, planejadas:16 },
  { mes:'Nov', concluidas:18, planejadas:17 },
  { mes:'Dez', concluidas:15, planejadas:16 },
];

export const dadosQualidade = [
  { mes:'Jan', taxa:97.2 }, { mes:'Fev', taxa:98.1 }, { mes:'Mar', taxa:97.8 },
  { mes:'Abr', taxa:98.5 }, { mes:'Mai', taxa:98.2 }, { mes:'Jun', taxa:99.0 },
  { mes:'Jul', taxa:98.7 }, { mes:'Ago', taxa:99.1 }, { mes:'Set', taxa:98.9 },
  { mes:'Out', taxa:99.3 }, { mes:'Nov', taxa:98.8 }, { mes:'Dez', taxa:99.2 },
];

# ✈ Aerocode — Aircraft Production Management System

> **Protótipo de GUI SPA Navegável**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-9135FF.svg?style=for-the-badge&logo=Vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Recharts](https://img.shields.io/badge/Built%20with-Recharts-8884d8)

---

## 📋 Sobre o Projeto

O **Aerocode** é um sistema de gestão da produção de aeronaves, originalmente desenvolvido como uma interface de linha de comando (CLI). Com a estratégia de expansão para grandes fabricantes globais — Boeing, Airbus, Embraer, Bombardier, Lockheed Martin, Dassault Aviation, BAE Systems e Gulfstream — tornou-se necessária a migração para uma interface gráfica moderna baseada na web (GUI).
 
Esta entrega corresponde à **primeira GUI** do sistema, desenvolvida como uma **Single Page Application (SPA)** com React. O protótipo é completamente navegável com dados simulados (sem back-end) e cobre todos os módulos funcionais definidos nos requisitos. O projeto acompanha um **relatório em PDF** (`Aerocode.pdf`) com wireframes de baixa fidelidade, fluxograma de navegação, levantamento de requisitos e identificação do público-alvo.

## 🚀 Funcionalidades

| Módulo | Requisito | Descrição |
|---|---|---|
| 🔐 **Login** | RF01 | Autenticação, animação de carregamento, validação |
| 📊 **Painel Inicial** | RF02 | KPIs, gráficos de produção e qualidade, ordens recentes |
| 📋 **Ordens de Produção** | RF03 | Listagem, busca, filtros, detalhe com fases e componentes |
| 🔩 **Componentes** | RF04 | Inventário, status de estoque, filtro por categoria |
| 🛡 **Controle de Qualidade** | RF05 | Inspeções, checklist interativo, aprovação/reprovação |
| 📈 **Relatórios** | RF06 | Gráficos analíticos, desempenho por engenheiro, exportação |
| 👥 **Usuários** | RF07 | Cadastro, perfis e funções (roles) |
| ⚙️ **Configurações** | — | Preferências do sistema |

---

## 🖥 Compatibilidade

| Plataforma | Requisito Mínimo |
|---|---|
| **Windows** | Windows 10 ou superior |
| **Linux** | Ubuntu 24.04 LTS ou superior (e derivados) |
| **Node.js** | v18 ou superior |
| **npm** | v9 ou superior |
| **Navegadores** | Chrome 100+, Firefox 100+, Edge 100+ |

---

## ⚡ Como Executar

### 1. Clonar o repositório
```bash
git clone https://github.com/tirolasca/aerocode-spa.git
cd aerocode-spa
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Executar em desenvolvimento
```bash
npm run dev
```

### 4. Build para produção
```bash
npm run build
npm run preview
```

---

## 🔑 Acesso ao Protótipo

| Campo | Valor |
|---|---|
| E-mail | `carlos.silva@aerocode.com` (já preenchido) |
| Senha | Qualquer valor não vazio |

> O protótipo não possui back-end. A autenticação é simulada localmente.

---

## 🏗 Estrutura do Projeto

```
aerocode-spa/
├── src/
│   ├── componentes/
│   │   └── BarraLateral.jsx        ← Menu lateral
│   ├── dados/
│   │   └── dadosMock.js            ← Dados simulados
│   ├── paginas/
│   │   ├── PaginaLogin.jsx         ← RF01: Autenticação
│   │   ├── PainelInicial.jsx       ← RF02: Dashboard + gráficos
│   │   ├── PaginaOrdens.jsx        ← RF03: Ordens + detalhe
│   │   └── OutrasPaginas.jsx       ← RF04-RF07: Qualidade, Componentes,
│   │                                   Relatórios, Usuários, Config.
│   ├── App.jsx                     ← Roteamento SPA + layout
│   ├── main.jsx                    ← Entry point
│   └── index.css                   ← Design system 
├── Aerocode.pdf                    ← Relatório PDF com wireframes
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠 Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| [JavaScript (ES2022+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | ES2022+ | Linguagem base de todas as páginas e componentes (arquivos `.jsx`) |
| [JSX](https://react.dev/learn/writing-markup-with-jsx) | — | Extensão de sintaxe que combina JavaScript e HTML nos componentes React |
| [React](https://react.dev/) | 19 | Framework principal de UI |
| [Vite](https://vitejs.dev/) | 8 | Bundler + servidor de desenvolvimento |
| [Recharts](https://recharts.org/) | 2 | Gráficos e visualizações |


---

## 📄 Entregáveis

| Arquivo | Descrição |
|---|---|
| `Aerocode.pdf` | Relatório PDF: wireframes, requisitos, público-alvo, fluxo de navegação (8 seções) |
| `src/` | Código-fonte da SPA React |
| `dist/` | Build de produção gerado |

---

## 📚 Referências
 
- ENGELBART, D. *Mother of All Demos*. SRI International, 1968.
- XEROX. *Alto Research Computer*. Xerox PARC, 1973.
- Meta Open Source. *React — A JavaScript library for building user interfaces*. Disponível em: https://react.dev/
- Vite. *Next Generation Frontend Tooling*. Disponível em: https://vitejs.dev/

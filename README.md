<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1>🔒 Plataforma de Auto-avaliação ISO 27017</h1>
  
  <h3 align="center">
    Plataforma Web para Auto-avaliação e Seleção Segura de Provedores de Cloud
  </h3>

  <p align="center">
    Ferramenta completa para avaliação de conformidade em segurança da informação em computação em nuvem baseada na norma ISO/IEC 27017
    <br />
    <br />
    <a href="https://github.com/Rayy2d2/TCC"><strong>Explorar o código »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Rayy2d2/TCC">Ver Demo</a>
    ·
    <a href="https://github.com/Rayy2d2/TCC/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/Rayy2d2/TCC/issues">Solicitar Feature</a>
  </p>
</div>

<!-- BADGES -->
<div align="center">
  
  ![GitHub repo size](https://img.shields.io/github/repo-size/Rayy2d2/TCC?style=for-the-badge)
  ![GitHub language count](https://img.shields.io/github/languages/count/Rayy2d2/TCC?style=for-the-badge)
  ![GitHub stars](https://img.shields.io/github/stars/Rayy2d2/TCC?style=for-the-badge)
  ![GitHub forks](https://img.shields.io/github/forks/Rayy2d2/TCC?style=for-the-badge)
  ![GitHub issues](https://img.shields.io/github/issues/Rayy2d2/TCC?style=for-the-badge)

</div>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>📑 Sumário</summary>
  <ol>
    <li>
      <a href="#-introdução">Introdução</a>
      <ul>
        <li><a href="#-tecnologias-utilizadas">Tecnologias Utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#-proposta-técnica-do-projeto">Proposta Técnica do Projeto</a>
      <ul>
        <li><a href="#-funcionalidades">Funcionalidades</a></li>
        <li><a href="#-arquitetura">Arquitetura</a></li>
      </ul>
    </li>
    <li><a href="#-plano-de-testes">Plano de Testes</a></li>
    <li><a href="#-como-usar">Como Usar</a></li>
    <li><a href="#-repositório-no-github">Repositório no GitHub</a></li>
    <li><a href="#-contato">Contato</a></li>
  </ol>
</details>

<br />

---

<!-- INTRODUCTION -->
## 📋 Introdução

Este projeto consiste em uma **plataforma web inovadora** voltada à autoavaliação de conformidade em segurança da informação em computação em nuvem, utilizando como referência a norma **ISO/IEC 27017**.

### 🎯 Objetivo Principal

Auxiliar empresas, especialmente **Micro, Pequenas e Médias Empresas (MPMEs)**, a:
```
✅ Avaliar seu nível de maturidade em segurança da informação
🔍 Identificar gaps de conformidade com a ISO/IEC 27017
💡 Receber recomendações automatizadas sobre provedores de nuvem
📊 Visualizar relatórios detalhados e personalizados
🎯 Tomar decisões informadas sobre modelos de serviço em nuvem
```

### 🎓 Contexto Acadêmico

Este relatório técnico apresenta os elementos estudados e aplicados ao longo da disciplina e demonstra como foram utilizados no desenvolvimento do **Trabalho de Graduação (TG)**.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

### 🛠 Tecnologias Utilizadas

<div align="center">

[![JavaScript][JavaScript.js]][JavaScript-url]
[![HTML5][HTML5.html]][HTML-url]
[![CSS3][CSS3.css]][CSS-url]
[![Node.js][Node.js]][Node-url]
[![Docker][Docker.com]][Docker-url]
[![Git][Git.badge]][Git-url]

</div>

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

## 📐 Proposta Técnica do Projeto

A proposta técnica foi definida no início da disciplina e envolve o desenvolvimento de uma aplicação web completa e robusta.

### ⚡ Funcionalidades

<table>
<tr>
<td width="50%">

#### 📝 **Coleta de Dados**
- Questionário interativo baseado nos controles da ISO/IEC 27017
- Validação em tempo real das respostas
- Salvamento automático do progresso
- Interface intuitiva e responsiva

</td>
<td width="50%">

#### 🔄 **Processamento**
- Análise automatizada de conformidade
- Cálculo de índices de maturidade
- Identificação de pontos críticos
- Geração de insights personalizados

</td>
</tr>
<tr>
<td width="50%">

#### 📊 **Visualização**
- Gráficos interativos e dinâmicos
- Dashboard com métricas-chave
- Relatórios exportáveis em PDF
- Comparativos e benchmarks

</td>
<td width="50%">

#### 🎯 **Recomendações**
- Sugestões de provedores adequados
- Modelos de serviço recomendados
- Planos de ação personalizados
- Melhores práticas de segurança

</td>
</tr>
</table>

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

### 🏗 Arquitetura

A arquitetura do sistema foi projetada para ser simples, eficiente e escalável:
```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│                   HTML5 + CSS3 + JavaScript                 │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Questionário │  │  Dashboard   │  │  Relatórios  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└────────────────────────────┬────────────────────────────────┘
                             │ API REST
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                              │
│                         Node.js                             │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Validação  │  │   Análise    │  │   Relatório  │    │
│  │   de Dados   │  │ Conformidade │  │   Generator  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    INFRAESTRUTURA                           │
│                    Docker + GitHub                          │
│                                                             │
│          Containerização • Versionamento • Deploy          │
└─────────────────────────────────────────────────────────────┘
```

#### 📦 Componentes Principais

| Camada | Tecnologia | Responsabilidade |
|--------|-----------|------------------|
| **Frontend** | HTML5, CSS3, JavaScript | Interface do usuário, experiência interativa |
| **Backend** | Node.js | Lógica de negócio, processamento de dados, API REST |
| **Infraestrutura** | Docker, GitHub | Containerização, versionamento, CI/CD |

#### 🔌 Stack Técnico Detalhado

- **Frontend:** HTML, CSS e JavaScript puro (sem frameworks pesados)
- **Backend:** Node.js com Express.js para criação da API REST
- **Infraestrutura:** 
  - Docker para containerização e portabilidade
  - GitHub para versionamento e colaboração
  - Git para controle de versão

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

## 🧪 Plano de Testes

Um plano de testes robusto foi desenvolvido para garantir a qualidade e confiabilidade da aplicação.

### 🎯 Funcionalidade Testada

> **Geração automática do relatório final de conformidade** após o usuário responder ao questionário.

### 📊 Objetivo do Teste

Garantir que a aplicação gere relatórios:
- ✅ **Precisos** - Dados corretos e cálculos exatos
- ✅ **Consistentes** - Resultados reproduzíveis
- ✅ **Conformes** - Alinhados com as respostas do usuário

### 📋 Premissas

<table>
<tr>
<td width="33%">

**🔹 Dados Completos**
- Usuário preenche todas as questões obrigatórias
- Respostas válidas e dentro do formato esperado

</td>
<td width="33%">

**🔹 Sistema Operacional**
- Backend em funcionamento
- API respondendo corretamente
- Sem erros de servidor

</td>
<td width="33%">

**🔹 Infraestrutura**
- Banco de dados acessível
- Conexões estáveis
- Recursos suficientes

</td>
</tr>
</table>

### 🧪 Tipos de Testes

#### 1️⃣ Teste Funcional

| Cenário | Entrada | Resultado Esperado | Status |
|---------|---------|-------------------|--------|
| Questionário completo | Todas as respostas válidas | Relatório gerado com sucesso | ✅ |
| Questionário incompleto | Respostas faltando | Mensagem de erro clara | ✅ |
| Dados inválidos | Respostas fora do padrão | Validação e erro informativo | ✅ |

#### 2️⃣ Teste de Validação de Dados
```javascript
✓ Validação de tipos de dados
✓ Verificação de campos obrigatórios
✓ Sanitização de inputs do usuário
✓ Validação de regras de negócio
✓ Verificação de consistência dos dados
```

#### 3️⃣ Teste de Interface

- **Responsividade:** Testes em diferentes dispositivos (desktop, tablet, mobile)
- **Usabilidade:** Verificação da experiência do usuário
- **Acessibilidade:** Conformidade com padrões WCAG
- **Compatibilidade:** Testes em múltiplos navegadores (Chrome, Firefox, Safari, Edge)
- **Performance:** Tempo de carregamento e resposta

### 📈 Métricas de Qualidade

<div align="center">

| Métrica | Meta | Status |
|---------|------|--------|
| Cobertura de Testes | > 80% | 🎯 |
| Bugs Críticos | 0 | ✅ |
| Tempo de Resposta | < 2s | ⚡ |
| Taxa de Sucesso | > 95% | 📊 |

</div>

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

## 🚀 Como Usar

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
```bash
Node.js v14.0 ou superior
npm v6.0 ou superior
Git
Docker (opcional)
```

### ⚙️ Instalação

Siga estes passos para configurar o projeto localmente:

1️⃣ **Clone o repositório**
```bash
git clone https://github.com/Rayy2d2/TCC.git
```

2️⃣ **Navegue até o diretório**
```bash
cd TCC
```

3️⃣ **Instale as dependências**
```bash
npm install
```

4️⃣ **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

5️⃣ **Inicie o servidor de desenvolvimento**
```bash
npm start
```

6️⃣ **Acesse a aplicação**
```
🌐 http://localhost:3000
```

### 🐳 Usando Docker

Para executar com Docker (recomendado para produção):
```bash
# Build da imagem
docker build -t plataforma-iso27017 .

# Executar o container
docker run -p 3000:3000 plataforma-iso27017
```

### 🧪 Executar Testes
```bash
# Testes unitários
npm test

# Testes de integração
npm run test:integration

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:coverage
```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

## 📂 Repositório no GitHub

O projeto está versionado utilizando **Git** e disponibilizado em repositório público no **GitHub**.

### 🔗 Link do Repositório

<div align="center">

### **[🔗 https://github.com/Rayy2d2/TCC](https://github.com/Rayy2d2/TCC)**

</div>

### 📁 Estrutura do Repositório
```
TCC/
│
├── 📄 README.md                 # Documentação principal
├── 📄 LICENSE                   # Licença do projeto
├── 📦 package.json              # Dependências do projeto
├── 🐳 Dockerfile                # Configuração Docker
├── 📄 .env.example              # Exemplo de variáveis de ambiente
│
├── 📁 src/                      # Código-fonte
│   ├── 📁 frontend/             # Frontend da aplicação
│   │   ├── 📄 index.html        # Página principal
│   │   ├── 📁 css/
│   │   │   └── 📄 styles.css    # Estilos
│   │   ├── 📁 js/
│   │   │   └── 📄 script.js     # JavaScript
│   │   └── 📁 assets/           # Imagens e recursos
│   │
│   └── 📁 backend/              # Backend da aplicação
│       ├── 📄 server.js         # Servidor principal
│       ├── 📁 routes/           # Rotas da API
│       ├── 📁 controllers/      # Controladores
│       ├── 📁 models/           # Modelos de dados
│       └── 📁 utils/            # Utilitários
│
├── 📁 docs/                     # Documentação
│   ├── 📄 architecture.md       # Arquitetura do sistema
│   ├── 📄 api-documentation.md  # Documentação da API
│   └── 📄 deployment.md         # Guia de deploy
│
├── 📁 tests/                    # Testes
│   ├── 📁 unit/                 # Testes unitários
│   ├── 📁 integration/          # Testes de integração
│   └── 📄 plano-testes.md       # Plano de testes
│
└── 📁 scripts/                  # Scripts auxiliares
    ├── 📄 setup.sh              # Setup inicial
    └── 📄 deploy.sh             # Script de deploy
```

### 📦 Conteúdo do Repositório

<table>
<tr>
<td width="50%">

#### ✅ Código e Configuração
- ✔️ Código-fonte completo (frontend e backend)
- ✔️ Arquivos de configuração Docker
- ✔️ Variáveis de ambiente (template)
- ✔️ Scripts de automação

</td>
<td width="50%">

#### ✅ Documentação
- ✔️ Documentação de setup e instalação
- ✔️ Documentação da API REST
- ✔️ Guia de arquitetura
- ✔️ Manuais de uso

</td>
</tr>
<tr>
<td width="50%">

#### ✅ Testes e Qualidade
- ✔️ Plano de testes detalhado
- ✔️ Suítes de testes automatizados
- ✔️ Casos de teste documentados
- ✔️ Relatórios de cobertura

</td>
<td width="50%">

#### ✅ Releases
- ✔️ Versão estável da aplicação
- ✔️ Changelog atualizado
- ✔️ Tags de versão
- ✔️ Histórico de commits

</td>
</tr>
</table>

### 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Para contribuir:

1. 🍴 Faça um fork do projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. ✍️ Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abra um Pull Request

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

## 📞 Contato

<div align="center">

**Desenvolvedor Principal**

[![LinkedIn][LinkedIn.badge]][LinkedIn-url]
[![GitHub][GitHub.badge]][GitHub-url]
[![Email][Email.badge]][Email-url]

**Link do Projeto:** [https://github.com/Rayy2d2/TCC](https://github.com/Rayy2d2/TCC)

</div>

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

## 🙏 Agradecimentos

Agradecimentos especiais a:

* Professor(a) orientador(a) pela orientação ao longo do projeto
* Colegas de turma pelas discussões e feedback
* Empresas que participaram dos testes de usabilidade
* Comunidade open-source pelas ferramentas utilizadas

---

<div align="center">
  
  ### ⭐ **Feito com ❤️ e muito ☕**
  
  <sub>Se este projeto foi útil para você, considere dar uma estrela!</sub>
  
  [![Star](https://img.shields.io/github/stars/Rayy2d2/TCC?style=social)](https://github.com/Rayy2d2/TCC)
  
</div>

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[JavaScript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[CSS3.css]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS

[HTML5.html]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[Docker.com]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[Git.badge]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/

[LinkedIn.badge]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[LinkedIn-url]: https://linkedin.com/in/seu-linkedin

[GitHub.badge]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[GitHub-url]: https://github.com/Rayy2d2

[Email.badge]: https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white
[Email-url]: mailto:seu-email@exemplo.com

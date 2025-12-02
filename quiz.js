// ========== DADOS GLOBAIS ==========
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// ========== PERGUNTAS ==========
const questions = [
  {
    question: "A empresa possui uma política de segurança da informação específica para uso de serviços em nuvem, conhecida e aplicada por todos os envolvidos?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Os papéis e responsabilidades entre cliente e provedor de nuvem estão formalmente documentados em contrato ou acordo?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Existem acordos de confidencialidade para todos que têm acesso a dados na nuvem (funcionários e terceiros)?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "A empresa mantém um inventário atualizado de ativos hospedados em serviços de nuvem?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Existem processos para a remoção segura de dados e ativos do cliente ao final do contrato de nuvem?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "O acesso a recursos de nuvem é concedido com base na real necessidade de negócio e revisado periodicamente?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Há um processo formal para criação, modificação e exclusão de usuários em serviços de nuvem?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Os dados da empresa estão segregados em ambientes virtuais, sem risco de mistura com outros clientes do provedor?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "As máquinas virtuais utilizadas são endurecidas (hardened) e seguem boas práticas de segurança?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "A empresa possui políticas de backup específicas para dados na nuvem, testadas regularmente?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Os logs de atividades em serviços de nuvem são coletados, protegidos e analisados periodicamente?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Existe monitoramento contínuo de serviços de nuvem, com alertas para incidentes?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "A empresa adota controles de rede específicos para conexões de nuvem (VPN, firewalls, IDS/IPS)?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "A segurança das redes virtuais está alinhada com a da infraestrutura física?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Os contratos com provedores incluem cláusulas de segurança, auditoria e conformidade regulatória?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Existe um processo de resposta a incidentes que abrange falhas em serviços de nuvem?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "O plano de continuidade de negócios inclui cenários de falhas em serviços de nuvem?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "O uso da nuvem pela empresa está em conformidade com leis e regulações aplicáveis (LGPD, GDPR, etc.)?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "A empresa revisa periodicamente os acordos de responsabilidade compartilhada com o provedor?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  },
  {
    question: "Os administradores da nuvem seguem boas práticas de segurança operacional (MFA, registros, segregação de funções)?",
    choice1: "Atende plenamente",
    choice2: "Atende parcialmente",
    choice3: "Não atende"
  }
];

const MAX_QUESTIONS = questions.length;

// ========== RECOMENDAÇÕES ==========
const recommendations = {
  low: {
    badge: '🔴 Baixo',
    title: 'Nível Baixo de Conformidade',
    diagnosis: 'A empresa ainda não possui estrutura sólida de segurança da informação em ambientes de nuvem.',
    recommendations: [
      'Começar por modelos de nuvem gerenciados, que transferem mais responsabilidade de segurança ao provedor.',
      'Revisar políticas internas, contratos e controles de acesso.',
      'Priorizar a criação de políticas de backup, controle de identidades e segregação de dados.',
      'Implementar ferramentas básicas de monitoramento e auditoria.'
    ],
    color: '#dc3545'
  },
  medium: {
    badge: '🟡 Médio',
    title: 'Nível Médio de Conformidade',
    diagnosis: 'A empresa possui práticas de segurança em andamento, mas com lacunas de controle, governança ou integração.',
    recommendations: [
      'Estabelecer acordos formais de responsabilidade compartilhada com o provedor.',
      'Implementar controle de acesso com MFA, auditoria de logs e testes de backup.',
      'Revisar conformidade com LGPD/GDPR e cláusulas contratuais de segurança.',
      'Adotar monitoramento contínuo de incidentes e práticas de "hardening".'
    ],
    color: '#ffc107'
  },
  high: {
    badge: '🟢 Alto',
    title: 'Nível Alto de Conformidade',
    diagnosis: 'A empresa apresenta maturidade elevada em segurança, gestão de riscos e conformidade com normas ISO.',
    recommendations: [
      'Expandir o uso de ambientes híbridos ou multicloud, otimizando custo e desempenho.',
      'Implementar auditorias periódicas e automação de segurança (DevSecOps).',
      'Fortalecer planos de continuidade e resposta a incidentes com integração em tempo real.',
      'Considerar certificações ISO 27017 e ISO 27018 para a organização.'
    ],
    color: '#28a745'
  }
};

// ========== FUNÇÕES DE HISTÓRICO ==========
function saveToHistory(score, totalQuestions, percentage, level) {
  const history = getHistory();
  
  const result = {
    id: Date.now(),
    date: new Date().toLocaleString('pt-BR'),
    score: score,
    total: totalQuestions,
    percentage: percentage,
    level: level,
    badge: recommendations[level].badge,
    title: recommendations[level].title
  };
  
  history.unshift(result); // Adiciona no início do array
  localStorage.setItem('quizHistory', JSON.stringify(history));
  
  console.log('✓ Resultado salvo no histórico:', result);
}

function getHistory() {
  const history = localStorage.getItem('quizHistory');
  return history ? JSON.parse(history) : [];
}

function loadHistory() {
  const history = getHistory();
  const historyList = document.getElementById('historyList');
  
  console.log('Carregando histórico...', history.length, 'registros');
  
  if (!historyList) return;
  
  // Calcular estatísticas
  updateHistoryStats(history);
  
  // Exibir lista de resultados
  if (history.length === 0) {
    historyList.innerHTML = `
      <div class="empty-history">
        <div class="empty-history-icon">📋</div>
        <p class="empty-history-text">Nenhuma avaliação realizada ainda.</p>
        <button class="btn" onclick="showPage('quizPage'); resetQuiz()">Fazer Primeira Avaliação</button>
      </div>
    `;
    return;
  }
  
  historyList.innerHTML = '';
  
  history.forEach(item => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div class="history-info">
        <div class="history-date">📅 ${item.date}</div>
        <div class="history-score">
          <span class="history-percentage">${item.percentage}%</span>
          <span class="history-badge ${item.level}">${item.badge}</span>
        </div>
        <div class="history-details">
          ${item.score}/${item.total} respostas corretas - ${item.title}
        </div>
      </div>
      <div class="history-actions-item">
        <button class="btn-small" onclick="viewHistoryDetails(${item.id})">👁️ Ver</button>
        <button class="btn-small delete" onclick="deleteHistoryItem(${item.id})">🗑️</button>
      </div>
    `;
    historyList.appendChild(div);
  });
}

function updateHistoryStats(history) {
  const totalTests = document.getElementById('totalTests');
  const avgScore = document.getElementById('avgScore');
  const bestScore = document.getElementById('bestScore');
  
  if (!totalTests || !avgScore || !bestScore) return;
  
  totalTests.textContent = history.length;
  
  if (history.length > 0) {
    const avg = Math.round(history.reduce((sum, item) => sum + item.percentage, 0) / history.length);
    const best = Math.max(...history.map(item => item.percentage));
    
    avgScore.textContent = avg + '%';
    bestScore.textContent = best + '%';
  } else {
    avgScore.textContent = '0%';
    bestScore.textContent = '0%';
  }
}

function viewHistoryDetails(id) {
  const history = getHistory();
  const item = history.find(h => h.id === id);
  
  if (!item) return;
  
  console.log('Visualizando detalhes:', item);
  
  // Simular exibição do resultado
  const data = recommendations[item.level];
  
  document.getElementById('scoreValue').textContent = `${item.percentage}%`;
  document.getElementById('scoreCircle').style.background = `linear-gradient(135deg, ${data.color}, ${data.color}dd)`;
  document.getElementById('statusBadge').textContent = data.badge;
  document.getElementById('diagnosisTitle').textContent = data.title;
  document.getElementById('diagnosisText').textContent = data.diagnosis;
  document.getElementById('cardHeader').style.background = `linear-gradient(135deg, ${data.color}, ${data.color}dd)`;
  
  const recommendationsList = document.getElementById('recommendationsList');
  recommendationsList.innerHTML = '';
  data.recommendations.forEach(rec => {
    const li = document.createElement('li');
    li.textContent = rec;
    recommendationsList.appendChild(li);
  });
  
  showPage('resultPage');
}

function deleteHistoryItem(id) {
  if (!confirm('Deseja realmente excluir esta avaliação do histórico?')) return;
  
  let history = getHistory();
  history = history.filter(item => item.id !== id);
  localStorage.setItem('quizHistory', JSON.stringify(history));
  
  console.log('✓ Item removido do histórico');
  loadHistory();
}

function clearHistory() {
  if (!confirm('Deseja realmente limpar todo o histórico de avaliações?')) return;
  
  localStorage.removeItem('quizHistory');
  console.log('✓ Histórico limpo');
  loadHistory();
}

// ========== FUNÇÕES DO QUIZ ==========
function startGame() {
  console.log('=== INICIANDO QUIZ ===');
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  showPage('quizPage');
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    showResults();
    return;
  }

  questionCounter++;
  
  const progressText = document.getElementById('progressText');
  const progressBarFull = document.getElementById('progressBarFull');
  const question = document.getElementById('question');

  if (progressText) {
    progressText.innerText = `Pergunta ${questionCounter} de ${MAX_QUESTIONS}`;
  }
  
  if (progressBarFull) {
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  }

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  
  if (question) {
    question.innerText = currentQuestion.question;
  }

  const choices = document.getElementsByClassName('choice-text');
  Array.from(choices).forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  console.log(`Pergunta ${questionCounter}/${MAX_QUESTIONS}`);
}

function processAnswer(selectedAnswer) {
  if (!acceptingAnswers) return null;
  
  acceptingAnswers = false;
  const answerNumber = parseInt(selectedAnswer, 10);
  
  console.log(`Resposta: ${answerNumber} (${answerNumber === 1 ? 'Atende plenamente' : answerNumber === 2 ? 'Atende parcialmente' : 'Não atende'})`);
  
  // Sistema de pontuação: apenas "Atende plenamente" (opção 1) ganha ponto
  if (answerNumber === 1) {
    score++;
    console.log(`✓ PONTO ADICIONADO! Score atual: ${score}/${questionCounter}`);
  } else {
    console.log(`✗ Sem ponto. Score atual: ${score}/${questionCounter}`);
  }
  
  return answerNumber;
}

function showResults() {
  console.log('=== FINALIZANDO QUIZ ===');
  console.log(`Score final: ${score}/${MAX_QUESTIONS}`);
  
  const percentage = Math.round((score / MAX_QUESTIONS) * 100);
  console.log(`Porcentagem: ${percentage}%`);
  
  const level = percentage <= 33 ? 'low' : percentage <= 66 ? 'medium' : 'high';
  const data = recommendations[level];

  console.log(`Nível: ${level.toUpperCase()}`);

  // Salvar no histórico
  saveToHistory(score, MAX_QUESTIONS, percentage, level);

  // Atualizar elementos da UI
  const scoreValue = document.getElementById('scoreValue');
  const scoreCircle = document.getElementById('scoreCircle');
  const statusBadge = document.getElementById('statusBadge');
  const diagnosisTitle = document.getElementById('diagnosisTitle');
  const diagnosisText = document.getElementById('diagnosisText');
  const cardHeader = document.getElementById('cardHeader');
  const recommendationsList = document.getElementById('recommendationsList');

  if (scoreValue) scoreValue.textContent = `${percentage}%`;
  if (scoreCircle) scoreCircle.style.background = `linear-gradient(135deg, ${data.color}, ${data.color}dd)`;
  if (statusBadge) statusBadge.textContent = data.badge;
  if (diagnosisTitle) diagnosisTitle.textContent = data.title;
  if (diagnosisText) diagnosisText.textContent = data.diagnosis;
  if (cardHeader) cardHeader.style.background = `linear-gradient(135deg, ${data.color}, ${data.color}dd)`;

  if (recommendationsList) {
    recommendationsList.innerHTML = '';
    data.recommendations.forEach(rec => {
      const li = document.createElement('li');
      li.textContent = rec;
      recommendationsList.appendChild(li);
    });
  }

  // Animar score
  animateScore(percentage);

  // Mostrar página de resultados
  showPage('resultPage');
  
  console.log('=== RESULTADO EXIBIDO ===');
}

function animateScore(targetPercentage) {
  const scoreElement = document.getElementById('scoreValue');
  if (!scoreElement) return;

  let current = 0;
  const increment = targetPercentage / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= targetPercentage) {
      current = targetPercentage;
      clearInterval(timer);
    }
    scoreElement.textContent = `${Math.round(current)}%`;
  }, 20);
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

function resetQuiz() {
  console.log('=== REINICIANDO QUIZ ===');
  startGame();
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('========================================');
  console.log('   QUIZ DE SEGURANÇA EM NUVEM');
  console.log('========================================');
  console.log('Total de perguntas:', MAX_QUESTIONS);
  console.log('Sistema de pontuação: Apenas "Atende plenamente" = 1 ponto');
  console.log('========================================\n');
  
  const choiceContainers = document.querySelectorAll('.choice-container');
  
  choiceContainers.forEach((container, index) => {
    container.addEventListener('click', function() {
      const choiceText = this.querySelector('.choice-text');
      
      if (!choiceText) {
        console.error('Erro: choice-text não encontrado no container', index + 1);
        return;
      }

      const selectedAnswer = choiceText.dataset['number'];
      
      const processedAnswer = processAnswer(selectedAnswer);

      if (processedAnswer !== null) {
        this.classList.add('correct');
        
        setTimeout(() => {
          this.classList.remove('correct');
          getNewQuestion();
        }, 800);
      }
    });
  });

  // Iniciar o quiz
  startGame();
});
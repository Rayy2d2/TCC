// ===============================================
//  TRUSTCLOUD - SISTEMA COMPLETO
//  Sistema de auditoria ISO/IEC 27017
// ===============================================

// Estado global da aplicação
const App = {
    currentPage: 'landing',
    quiz: {
        currentQuestion: 0,
        selectedAnswer: null,
        filesUploaded: false,
        answers: [],
        startTime: null,
        totalQuestions: 5
    },
    history: []
};

// Base de dados das perguntas do quiz
const questions = [
    {
        question: "Sua organização possui políticas documentadas para segurança de dados em ambientes de nuvem?",
        choices: [
            "Atende plenamente os requisitos",
            "Atende parcialmente os requisitos",
            "Não atende os requisitos"
        ]
    },
    {
        question: "Como é realizado o controle de acesso aos recursos na nuvem?",
        choices: [
            "Atende plenamente os requisitos",
            "Atende parcialmente os requisitos",
            "Não atende os requisitos"
        ]
    },
    {
        question: "Sua organização realiza backups regulares dos dados armazenados na nuvem?",
        choices: [
            "Atende plenamente os requisitos",
            "Atende parcialmente os requisitos",
            "Não atende os requisitos"
        ]
    },
    {
        question: "Como é feito o monitoramento de atividades suspeitas na infraestrutura de nuvem?",
        choices: [
            "Atende plenamente os requisitos",
            "Atende parcialmente os requisitos",
            "Não atende os requisitos"
        ]
    },
    {
        question: "Existe um plano de resposta a incidentes específico para ambientes de nuvem?",
        choices: [
            "Atende plenamente os requisitos",
            "Atende parcialmente os requisitos",
            "Não atende os requisitos"
        ]
    }
];

// ===============================================
//  SISTEMA DE NAVEGAÇÃO
// ===============================================

function showPage(pageName) {
    // Esconder todas as páginas
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('gamePage').classList.add('hidden');
    document.getElementById('historyPage').classList.add('hidden');
    
    // Mostrar página solicitada
    switch(pageName) {
        case 'landing':
            document.getElementById('landingPage').classList.remove('hidden');
            App.currentPage = 'landing';
            break;
        case 'game':
            document.getElementById('gamePage').classList.remove('hidden');
            App.currentPage = 'game';
            initializeQuiz();
            break;
        case 'history':
            document.getElementById('historyPage').classList.remove('hidden');
            App.currentPage = 'history';
            initializeHistory();
            break;
    }
}

// ===============================================
//  SISTEMA DE QUIZ/AVALIAÇÃO
// ===============================================

function initializeQuiz() {
    // Reset do quiz
    App.quiz = {
        currentQuestion: 0,
        selectedAnswer: null,
        filesUploaded: false,
        answers: [],
        startTime: new Date(),
        totalQuestions: questions.length
    };
    
    updateProgress();
    loadQuestion();
    setupQuizEventListeners();
}

function setupQuizEventListeners() {
    // File upload
    const fileUpload = document.getElementById('fileUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (fileUpload) {
        fileUpload.addEventListener('change', handleFileSelect);
    }
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', handleFileUpload);
    }
}

function updateProgress() {
    const progressPercentage = ((App.quiz.currentQuestion + 1) / App.quiz.totalQuestions) * 100;
    const progressBar = document.getElementById('progressBarFull');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Pergunta ${App.quiz.currentQuestion + 1} de ${App.quiz.totalQuestions}`;
    }
}

function loadQuestion() {
    if (App.quiz.currentQuestion < questions.length) {
        const current = questions[App.quiz.currentQuestion];
        const questionElement = document.getElementById('question');
        const choicesContainer = document.getElementById('choices');
        
        if (questionElement) {
            questionElement.textContent = current.question;
        }
        
        if (choicesContainer) {
            // Limpar choices anteriores
            choicesContainer.innerHTML = '';
            
            // Criar novas choices
            current.choices.forEach((choice, index) => {
                const choiceContainer = document.createElement('div');
                choiceContainer.className = 'choice-container';
                choiceContainer.dataset.number = index + 1;
                choiceContainer.addEventListener('click', handleAnswerSelection);
                
                choiceContainer.innerHTML = `
                    <p class="choice-prefix">${String.fromCharCode(65 + index)}</p>
                    <p class="choice-text">${choice}</p>
                `;
                
                choicesContainer.appendChild(choiceContainer);
            });
        }
    }
    
    // Reset status da pergunta
    App.quiz.selectedAnswer = null;
    App.quiz.filesUploaded = false;
    resetFileUpload();
    updateStatus();
}

function handleAnswerSelection(event) {
    const container = event.currentTarget;
    const choiceContainers = document.querySelectorAll('.choice-container');
    
    // Remove seleção anterior
    choiceContainers.forEach(c => c.classList.remove('selected'));
    
    // Adiciona seleção atual
    container.classList.add('selected');
    App.quiz.selectedAnswer = container.dataset.number;
    
    // Salvar resposta
    const current = questions[App.quiz.currentQuestion];
    const answerText = current.choices[parseInt(App.quiz.selectedAnswer) - 1];
    
    App.quiz.answers[App.quiz.currentQuestion] = {
        question: current.question,
        answer: answerText,
        questionNumber: App.quiz.currentQuestion + 1,
        timestamp: new Date()
    };
    
    updateStatus();
}

function handleFileSelect() {
    const fileUpload = document.getElementById('fileUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileList = document.getElementById('fileList');
    
    if (fileUpload && fileUpload.files.length > 0) {
        displaySelectedFiles(fileUpload.files);
        if (uploadBtn) {
            uploadBtn.disabled = false;
        }
    } else {
        resetFileDisplay();
    }
}

function displaySelectedFiles(files) {
    const fileList = document.getElementById('fileList');
    let fileNames = '';
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSize = (file.size / 1024).toFixed(2);
        
        fileNames += `
            <div class="file-item">
                <span>${file.name} (${fileSize} KB)</span>
            </div>
        `;
    }
    
    if (fileList) {
        fileList.innerHTML = fileNames;
    }
}

function resetFileDisplay() {
    const fileList = document.getElementById('fileList');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (fileList) {
        fileList.innerHTML = 'Nenhum arquivo selecionado';
    }
    if (uploadBtn) {
        uploadBtn.disabled = true;
    }
}

function handleFileUpload() {
    const fileUpload = document.getElementById('fileUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (!validateFiles()) {
        return;
    }
    
    // Simular processo de upload
    if (uploadBtn) {
        uploadBtn.textContent = 'Enviando...';
        uploadBtn.disabled = true;
    }
    
    setTimeout(() => {
        App.quiz.filesUploaded = true;
        if (uploadBtn) {
            uploadBtn.textContent = 'Arquivo enviado ✓';
            uploadBtn.style.background = '#28a745';
        }
        updateStatus();
    }, 1500);
}

function validateFiles() {
    const fileUpload = document.getElementById('fileUpload');
    if (!fileUpload || !fileUpload.files.length) return false;
    
    const files = fileUpload.files;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (file.size > maxSize) {
            alert(`Arquivo ${file.name} é muito grande. Máximo: 5MB`);
            return false;
        }
        
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            alert(`Tipo de arquivo ${fileExtension} não permitido.`);
            return false;
        }
    }
    
    return true;
}

function updateStatus() {
    const statusContainer = document.querySelector('.submission-status');
    const answerStatus = document.getElementById('answerStatus');
    
    if (!answerStatus || !statusContainer) return;
    
    if (App.quiz.selectedAnswer && App.quiz.filesUploaded) {
        answerStatus.textContent = 'Pronto! Resposta e arquivo enviados com sucesso.';
        statusContainer.classList.add('success');
        
        // Auto avançar para próxima pergunta
        setTimeout(() => {
            nextQuestion();
        }, 2000);
        
    } else if (App.quiz.selectedAnswer && !App.quiz.filesUploaded) {
        answerStatus.textContent = 'Resposta selecionada. Agora anexe um arquivo para continuar.';
        statusContainer.classList.remove('success');
        
    } else if (!App.quiz.selectedAnswer && App.quiz.filesUploaded) {
        answerStatus.textContent = 'Arquivo enviado. Agora escolha uma alternativa.';
        statusContainer.classList.remove('success');
        
    } else {
        answerStatus.textContent = 'Escolha uma alternativa e anexe um arquivo para continuar.';
        statusContainer.classList.remove('success');
    }
}

function nextQuestion() {
    App.quiz.currentQuestion++;
    
    if (App.quiz.currentQuestion < questions.length) {
        updateProgress();
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function resetFileUpload() {
    const fileUpload = document.getElementById('fileUpload');
    const fileList = document.getElementById('fileList');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (fileUpload) fileUpload.value = '';
    if (fileList) fileList.innerHTML = 'Nenhum arquivo selecionado';
    if (uploadBtn) {
        uploadBtn.textContent = 'Enviar arquivo';
        uploadBtn.style.background = '#28a745';
        uploadBtn.disabled = true;
    }
}

function finishQuiz() {
    const endTime = new Date();
    const duration = Math.floor((endTime - App.quiz.startTime) / 1000);
    
    // Calcular pontuação baseada nas respostas
    const answerCounts = {
        "Atende plenamente os requisitos": 0,
        "Atende parcialmente os requisitos": 0,
        "Não atende os requisitos": 0
    };
    
    App.quiz.answers.forEach(answer => {
        if (answerCounts.hasOwnProperty(answer.answer)) {
            answerCounts[answer.answer]++;
        }
    });
    
    // Sistema de pontuação: 20 pontos para "Atende plenamente", 10 para "parcialmente", 0 para "não atende"
    const finalScore = (answerCounts["Atende plenamente os requisitos"] * 20) + 
                      (answerCounts["Atende parcialmente os requisitos"] * 10);
    
    // Salvar no histórico
    const evaluation = {
        id: Date.now(),
        dataHora: App.quiz.startTime.toLocaleString('pt-BR'),
        pontuacao: finalScore,
        duracao: duration,
        respostas: answerCounts,
        detalhes: App.quiz.answers
    };
    
    // Carregar histórico existente do localStorage
    let historico = [];
    try {
        const stored = localStorage.getItem('avaliacaoHistorico');
        if (stored) {
            historico = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Erro ao carregar histórico:', e);
    }
    
    // Adicionar nova avaliação
    historico.unshift(evaluation);
    
    // Salvar no localStorage
    try {
        localStorage.setItem('avaliacaoHistorico', JSON.stringify(historico));
    } catch (e) {
        console.error('Erro ao salvar histórico:', e);
    }
    
    showResults(finalScore, answerCounts);
}

function showResults(finalScore, answerCounts) {
    const gameContainer = document.getElementById('game');
    
    if (gameContainer) {
        gameContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="background: #28a745; color: white; width: 80px; height: 80px; 
                            border-radius: 50%; display: flex; align-items: center; 
                            justify-content: center; margin: 0 auto 2rem auto;">
                    <span style="font-size: 2rem;">✓</span>
                </div>
                
                <h2 style="color: #28a745; margin-bottom: 1rem; font-size: 2.2rem;">
                    Avaliação Concluída!
                </h2>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; 
                            margin-bottom: 2rem; border-left: 4px solid #007bff;">
                    <p style="font-size: 1.3rem; margin-bottom: 1rem; font-weight: 600;">
                        Pontuação Final: ${finalScore} pontos
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                        <div style="text-align: center; padding: 1rem; background: white; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #28a745;">
                                ${answerCounts["Atende plenamente os requisitos"]}
                            </div>
                            <div style="font-size: 0.9rem; color: #666;">Atende Plenamente</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: white; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #ffc107;">
                                ${answerCounts["Atende parcialmente os requisitos"]}
                            </div>
                            <div style="font-size: 0.9rem; color: #666;">Atende Parcialmente</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: white; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #dc3545;">
                                ${answerCounts["Não atende os requisitos"]}
                            </div>
                            <div style="font-size: 0.9rem; color: #666;">Não Atende</div>
                        </div>
                    </div>
                </div>
                
                <p style="font-size: 1.1rem; margin-bottom: 2rem; color: #666;">
                    Obrigado por completar nossa avaliação de conformidade ISO/IEC 27017.
                </p>
                
                <div style="background: #e3f2fd; padding: 1.5rem; border-radius: 10px; 
                            margin-bottom: 2rem; border-left: 4px solid #2196f3;">
                    <p style="margin-bottom: 1rem; font-weight: 500;">
                        <strong>Próximos passos:</strong>
                    </p>
                    <ul style="text-align: left; max-width: 400px; margin: 0 auto; color: #555;">
                        <li>Análise das suas respostas e evidências</li>
                        <li>Elaboração do relatório de conformidade</li>
                        <li>Contato em até 48 horas úteis</li>
                        <li>Apresentação do plano de melhorias</li>
                    </ul>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button onclick="showPage('landing')" class="btn">
                        Voltar ao Início
                    </button>
                    <button onclick="showPage('history')" class="btn">
                        Ver Histórico
                    </button>
                    <button onclick="showPage('game')" class="btn" style="background: #28a745;">
                        Nova Avaliação
                    </button>
                </div>
            </div>
        `;
    }
}

// ===============================================
//  SISTEMA DE HISTÓRICO
// ===============================================

function initializeHistory() {
    loadHistoryData();
    setupHistoryEventListeners();
    renderHistory();
}

function setupHistoryEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearHistoryBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterHistory(e.target.value);
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearHistory);
    }
}

function loadHistoryData() {
    try {
        const stored = localStorage.getItem('avaliacaoHistorico');
        App.history = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Erro ao carregar histórico:', e);
        App.history = [];
    }
}

function filterHistory(searchTerm) {
    const term = searchTerm.toLowerCase();
    const filtered = App.history.filter(item => {
        const data = item.dataHora.toLowerCase();
        const pontuacao = item.pontuacao.toString();
        return data.includes(term) || pontuacao.includes(term);
    });
    
    renderHistory(filtered);
}

function renderHistory(filteredHistory = null) {
    const historyToShow = filteredHistory || App.history;
    
    renderStats();
    renderHistoryItems(historyToShow);
}

function renderStats() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;
    
    if (App.history.length === 0) {
        statsGrid.style.display = 'none';
        return;
    }
    
    statsGrid.style.display = 'grid';
    
    const totalAvaliacoes = App.history.length;
    const pontuacaoMedia = Math.round(
        App.history.reduce((acc, item) => acc + item.pontuacao, 0) / totalAvaliacoes
    );
    
    let totalAtendePlenamente = 0;
    let totalAtendeParc = 0;
    let totalNaoAtende = 0;

    App.history.forEach(item => {
        totalAtendePlenamente += item.respostas["Atende plenamente os requisitos"] || 0;
        totalAtendeParc += item.respostas["Atende parcialmente os requisitos"] || 0;
        totalNaoAtende += item.respostas["Não atende os requisitos"] || 0;
    });

    const maiorPontuacao = Math.max(...App.history.map(item => item.pontuacao));

    statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${totalAvaliacoes}</div>
            <div class="stat-label">Total de Avaliações</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${pontuacaoMedia}</div>
            <div class="stat-label">Pontuação Média</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${maiorPontuacao}</div>
            <div class="stat-label">Maior Pontuação</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${totalAtendePlenamente}</div>
            <div class="stat-label">Total "Atende Plenamente"</div>
        </div>
    `;
}

function renderHistoryItems(historyToShow) {
    const historyContent = document.getElementById('historyContent');
    if (!historyContent) return;

    if (historyToShow.length === 0) {
        if (App.history.length === 0) {
            historyContent.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 4rem; margin-bottom: 20px;">📋</div>
                    <h3>Nenhuma avaliação encontrada</h3>
                    <p>Você ainda não realizou nenhuma avaliação de segurança.</p>
                    <button class="btn" onclick="showPage('game')" style="margin-top: 20px;">
                        🚀 Fazer Primeira Avaliação
                    </button>
                </div>
            `;
        } else {
            historyContent.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Tente pesquisar por outros termos.</p>
                </div>
            `;
        }
        return;
    }

    const historicoOrdenado = [...historyToShow].sort((a, b) => 
        new Date(b.dataHora) - new Date(a.dataHora)
    );

    const historicoHTML = historicoOrdenado.map((item, index) => `
        <div class="history-item">
            <div class="history-item-header">
                <div class="history-date">
                    📅 ${formatDate(item.dataHora)}
                </div>
                <div class="history-score">
                    🎯 ${item.pontuacao} pontos
                </div>
            </div>
            <div class="results-grid">
                <div class="result-item atende-plenamente">
                    <div class="result-number">
                        ✅ ${item.respostas["Atende plenamente os requisitos"] || 0}
                    </div>
                    <div class="result-label">Atende Plenamente</div>
                </div>
                <div class="result-item atende-parcialmente">
                    <div class="result-number">
                        ⚠️ ${item.respostas["Atende parcialmente os requisitos"] || 0}
                    </div>
                    <div class="result-label">Atende Parcialmente</div>
                </div>
                <div class="result-item nao-atende">
                    <div class="result-number">
                        ❌ ${item.respostas["Não atende os requisitos"] || 0}
                    </div>
                    <div class="result-label">Não Atende</div>
                </div>
            </div>
        </div>
    `).join('');

    historyContent.innerHTML = `
        <div class="history-grid">
            ${historicoHTML}
        </div>
    `;
}

function formatDate(dateString) {
    try {
        const data = new Date(dateString);
        const agora = new Date();
        const diffTime = Math.abs(agora - data);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return `Hoje às ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (diffDays === 2) {
            return `Ontem às ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (diffDays <= 7) {
            return `${diffDays - 1} dias atrás`;
        } else {
            return data.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    } catch (e) {
        return dateString;
    }
}

function clearHistory() {
    if (confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
        try {
            localStorage.removeItem('avaliacaoHistorico');
            App.history = [];
            renderHistory();
            
            // Feedback visual
            const btn = document.getElementById('clearHistoryBtn');
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = '✅ Histórico Limpo!';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
            }
        } catch (e) {
            console.error('Erro ao limpar histórico:', e);
            alert('Erro ao limpar histórico. Tente novamente.');
        }
    }
}

// ===============================================
//  INICIALIZAÇÃO DA APLICAÇÃO
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar aplicação
    console.log('TrustCloud Sistema iniciado');
    
    // Verificar se há parâmetros na URL para navegação direta
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    
    if (page && ['landing', 'game', 'history'].includes(page)) {
        showPage(page);
    } else {
        showPage('landing');
    }
    
    // Setup de event listeners globais
    setupGlobalEventListeners();
});

function setupGlobalEventListeners() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Obrigado por se inscrever! Em breve você receberá nossas atualizações.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
    
    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===============================================
//  UTILITÁRIOS
// ===============================================

// Função para debug (pode ser removida em produção)
function debugApp() {
    console.log('Estado atual da aplicação:', {
        currentPage: App.currentPage,
        quiz: App.quiz,
        historyCount: App.history.length
    });
}

// Função para exportar dados (funcionalidade futura)
function exportHistory() {
    if (App.history.length === 0) {
        alert('Nenhum histórico para exportar.');
        return;
    }
    
    const dataStr = JSON.stringify(App.history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `trustcloud_historico_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Função para detectar suporte a recursos do navegador
function checkBrowserSupport() {
    const support = {
        localStorage: typeof(Storage) !== "undefined",
        fileAPI: window.File && window.FileReader && window.FileList && window.Blob,
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid')
    };
    
    if (!support.localStorage) {
        console.warn('LocalStorage não suportado. Histórico não será salvo.');
    }
    
    if (!support.fileAPI) {
        console.warn('File API não suportada. Upload de arquivos pode não funcionar.');
    }
    
    return support;
}

// Verificar suporte do navegador na inicialização
checkBrowserSupport();

// Expor funções globais para uso em onclick handlers
window.showPage = showPage;
window.debugApp = debugApp;
window.exportHistory = exportHistory;
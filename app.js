import { pages, initialState } from './config.js';

let currentPage = initialState;
let history = [];
let selectedChoice = null;
let calculationResult = null;

function renderPage() {
    const page = pages[currentPage];
    const content = document.getElementById('page-content');
    const title = document.getElementById('page-title');
    
    title.textContent = page.title;
    content.innerHTML = '';

    switch(page.type) {
        case 'Ação':
            renderActionPage(content, page);
            break;
        case 'Estado':
            renderStatePage(content, page);
            break;
        case 'Calculadora':
            renderCalculatorPage(content, page);
            break;
    }

    document.getElementById('btn-next').disabled = !isNextAllowed();
}

function renderActionPage(container, page) {
    const instruction = document.createElement('p');
    instruction.textContent = page.instruction;
    instruction.style.margin = '2rem 0';
    container.appendChild(instruction);

    if (page.extraInstruction) {
        const alert = document.createElement('div');
        alert.className = 'alert-box';
        alert.textContent = page.extraInstruction;
        container.appendChild(alert);
    }
}

function renderStatePage(container, page) {
    page.choices.forEach(choice => {
        const div = document.createElement('div');
        div.className = `choice-item${selectedChoice === choice ? ' selected' : ''}`;
        div.textContent = choice;
        div.addEventListener('click', () => {
            selectedChoice = choice;
            document.querySelectorAll('.choice-item').forEach(c => c.classList.remove('selected'));
            div.classList.add('selected');
            document.getElementById('btn-next').disabled = false;
        });
        container.appendChild(div);
    });
}

function renderCalculatorPage(container, page) {
    const inputs = page.inputs.map(input => {
        const div = document.createElement('div');
        div.className = 'calculator-inputs';
        div.innerHTML = `
            <label>${input}</label>
            <input type="number" step="0.1" required>
        `;
        return div;
    });

    inputs.forEach(input => container.appendChild(input));

    const resultDiv = document.createElement('div');
    resultDiv.style.margin = '1rem 0';
    container.appendChild(resultDiv);

    const calculateBtn = document.createElement('button');
    calculateBtn.className = 'nav-btn';
    calculateBtn.textContent = 'Calcular';
    calculateBtn.addEventListener('click', () => {
        const values = Array.from(document.querySelectorAll('input')).map(i => parseFloat(i.value));
        calculationResult = page.calculate(...values);
        resultDiv.textContent = `Resultado: ${calculationResult.toFixed(2)}`;
        document.getElementById('btn-next').disabled = false;
    });
    container.appendChild(calculateBtn);
}

function isNextAllowed() {
    const page = pages[currentPage];
    if (page.type === 'Estado' && !selectedChoice) return false;
    if (page.type === 'Calculadora' && !calculationResult) return false;
    return true;
}

function navigateNext() {
    const page = pages[currentPage];
    history.push(currentPage);
    
    if (page.type === 'Estado') {
        currentPage = page.next[selectedChoice];
        selectedChoice = null;
    } else if (page.type === 'Calculadora') {
        currentPage = page.next(calculationResult);
        calculationResult = null;
    } else {
        currentPage = page.next;
    }
    
    renderPage();
}

// Event Listeners
document.getElementById('btn-next').addEventListener('click', () => {
    if (isNextAllowed()) navigateNext();
    else alert('Por favor selecione uma opção ou complete o cálculo');
});

document.getElementById('btn-back').addEventListener('click', () => {
    if (history.length > 0) {
        currentPage = history.pop();
        renderPage();
    }
});

// Initial render
renderPage();


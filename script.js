// Fecha de inicio: 5 de mayo de 2024
const START_DATE = new Date('2024-05-05');
const CARMEN_NAME = 'Carmen';

// Lista de fotos de nuestros momentos especiales
const FOTOS = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'img7.jpg',
    'img8.jpg',
    'img9.jpg',
    'img10.jpg',
    'img11.jpg'
];

// Índice de foto actual para slideshow
let currentPhotoIndex = 0;

// Frases románticas para el comando 'love'
const LOVE_MESSAGES = [
    "Carmen, desde el 5 de mayo de 2024, cada día contigo ha sido un descubrimiento hermoso. Eres mi razón para sonreír.",
    "Mi amor, aunque estemos pasando por momentos difíciles, sé que juntos podemos superar cualquier cosa. Te amo más de lo que las palabras pueden expresar.",
    "Carmen, tu nombre en mi corazón es como música suave que calma todas mis tormentas. Eres mi paz.",
    "Cada vez que pienso en ti, siento que el mundo se vuelve más hermoso. Eres la luz que ilumina mi vida.",
    "Aunque las situaciones difíciles lleguen, mi amor por ti solo crece. Estamos volviendo a enamorarnos, y eso es mágico.",
    "Carmen, eres como una estrella que brilla en mi cielo oscuro. Gracias por estar en mi vida.",
    "Mi corazón late más fuerte cuando estás cerca. Eres mi todo, mi razón, mi amor.",
    "En este momento difícil, recuerda que juntos somos invencibles. El amor que siento por ti es infinito.",
    "Carmen, cada día a tu lado es un regalo. Aunque ahora sea difícil, sé que saldremos más fuertes.",
    "Tu sonrisa es el sol que ilumina mis días más oscuros. Te amo con todo mi ser.",
    "Estamos escribiendo nuestra historia juntos, y este capítulo difícil solo hará que nuestro amor sea más fuerte.",
    "Carmen, eres mi persona favorita en todo el universo. Gracias por elegirme cada día.",
    "Aunque las palabras a veces no sean suficientes, quiero que sepas que te amo profundamente.",
    "Cada recuerdo contigo es un tesoro que guardo en mi corazón. Eres mi felicidad.",
    "Mi amor por ti es como el océano: profundo, infinito y siempre presente.",
    "Carmen, en este momento de volver a enamorarnos, siento que estoy descubriendo el amor por primera vez.",
    "Tu presencia en mi vida es el mejor regalo que he recibido. Te amo incondicionalmente.",
    "Aunque el camino sea difícil ahora, sé que juntos llegaremos a un lugar hermoso.",
    "Carmen, eres la razón por la que creo en el amor verdadero. Eres mi todo.",
    "Cada día contigo desde el 5 de mayo ha sido especial. Gracias por ser quien eres."
];

// Frases especiales adicionales
const SPECIAL_MESSAGES = {
    good_morning: [
        "Buenos días, mi amor 💕. Que tengas un día hermoso, y recuerda que te amo.",
        "Buenos días, Carmen. Despertar pensando en ti es el mejor inicio de día.",
        "Buenos días, mi vida. Que este día te traiga mucha felicidad."
    ],
    good_night: [
        "Buenas noches, Carmen. Que sueñes con cosas hermosas. Te amo.",
        "Buenas noches, mi amor. Descansa bien, y recuerda que te amo mucho.",
        "Buenas noches, mi vida. Que tengas dulces sueños."
    ],
    miss_you: [
        "Te extraño mucho, Carmen. Cada segundo sin ti parece una eternidad.",
        "Carmen, mi corazón te extraña cada momento. No puedo esperar para verte.",
        "Te extraño más de lo que las palabras pueden decir. Eres mi todo."
    ]
};

// Historial de comandos
let commandHistory = [];
let historyIndex = -1;

// Referencias al DOM
const terminal = document.getElementById('terminal');
const terminalInput = document.getElementById('terminalInput');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    terminalInput.focus();
    
    // Manejar entrada de comandos
    terminalInput.addEventListener('keydown', handleKeyDown);
    
    // Auto-scroll al final
    scrollToBottom();
});

// Manejar teclas especiales
function handleKeyDown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = terminalInput.value.trim();
        if (command) {
            executeCommand(command);
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }
}

// Ejecutar comando
function executeCommand(command) {
    // Mostrar comando ingresado
    addCommandLine(command);
    
    // Convertir a minúsculas y trim
    const cmdLower = command.toLowerCase().trim();
    
    // Verificar comandos de múltiples palabras primero (antes de dividir)
    // Normalizar espacios múltiples y trim
    const normalizedCmd = cmdLower.replace(/\s+/g, ' ').trim();
    
    const multiWordCommands = {
        'te extraño': showMissYou,
        'te extrano': showMissYou,
        'miss you': showMissYou,
        'buenos días': showGoodMorning,
        'buenos dias': showGoodMorning,
        'buenosdias': showGoodMorning,
        'good morning': showGoodMorning,
        'buenas noches': showGoodNight,
        'buenasnoches': showGoodNight,
        'good night': showGoodNight,
        'tiempo juntos': showTimeTogether
    };
    
    if (multiWordCommands[normalizedCmd]) {
        multiWordCommands[normalizedCmd]();
        scrollToBottom();
        return;
    }
    
    // Convertir a minúsculas y dividir
    const parts = cmdLower.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    // Ejecutar comando
    switch(cmd) {
        case 'help':
            showHelp();
            break;
        case 'love':
            showLoveMessage();
            break;
        case 'date':
            showDate();
            break;
        case 'whoami':
            showWhoami();
            break;
        case 'carmen':
            showCarmen();
            break;
        case 'history':
            showHistory();
            break;
        case 'clear':
            clearTerminal();
            break;
        case 'ls':
            showLs();
            break;
        case 'pwd':
            showPwd();
            break;
        case 'cat':
            if (args.length > 0) {
                showCat(args[0]);
            } else {
                showError('cat: falta el argumento de archivo');
            }
            break;
        case 'echo':
            showEcho(args.join(' '));
            break;
        case 'grep':
            if (args.length > 0) {
                showGrep(args.join(' '));
            } else {
                showError('grep: falta el patrón de búsqueda');
            }
            break;
        case 'touch':
            showTouch(args[0] || 'archivo');
            break;
        case 'rm':
            showRm(args[0] || '');
            break;
        case 'mkdir':
            showMkdir(args[0] || 'directorio');
            break;
        case 'cd':
            showCd(args[0] || '~');
            break;
        case 'bienvenida':
        case 'welcome':
            showWelcome();
            break;
        case 'cuanto':
        case 'cuánto':
            showCuanto();
            break;
        case 'fecha':
            showStartDate();
            break;
        case 'tiempo':
            showTimeTogether();
            break;
        case 'secreto':
        case 'secret':
            showSecret();
            break;
        case 'promesa':
        case 'promise':
            showPromise();
            break;
        case 'motivo':
        case 'reason':
            showReason();
            break;
        case 'futuro':
        case 'future':
            showFuture();
            break;
        case 'exit':
        case 'quit':
            showExit();
            break;
        case 'fotos':
        case 'recuerdos':
        case 'memorias':
        case 'photos':
            showFotos();
            break;
        case 'foto':
        case 'photo':
            if (args.length > 0) {
                const num = parseInt(args[0]);
                if (!isNaN(num) && num >= 1 && num <= FOTOS.length) {
                    showFoto(num);
                } else {
                    showError(`Foto no encontrada. Disponibles: 1-${FOTOS.length}`);
                }
            } else {
                showFoto(currentPhotoIndex + 1);
            }
            break;
        case 'slideshow':
        case 'carrusel':
            startSlideshow();
            break;
        case 'next':
        case 'siguiente':
            nextFoto();
            break;
        case 'prev':
        case 'anterior':
            prevFoto();
            break;
        default:
            showError(`Comando no encontrado: ${command}. Escribe 'help' para ver los comandos disponibles.`);
    }
    
    scrollToBottom();
}

// Agregar línea de comando
function addCommandLine(command) {
    const line = document.createElement('div');
    line.className = 'command-line';
    line.innerHTML = `<span class="command-input">carmen@corazon:~$ ${command}</span>`;
    terminal.appendChild(line);
}

// Mostrar salida
function addOutput(content, className = 'command-output') {
    const output = document.createElement('div');
    output.className = className;
    output.innerHTML = content;
    terminal.appendChild(output);
}

// Mostrar error
function showError(message) {
    addOutput(message, 'command-error');
}

// Mostrar éxito
function showSuccess(message) {
    addOutput(message, 'command-success');
}

// Scroll al final
function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

// Comandos
function showHelp() {
    const help = `
<div class="help-command">
<strong>help</strong> <span>Muestra esta ayuda</span><br>
<strong>love</strong> <span>Recibe una frase romántica especial</span><br>
<strong>date</strong> <span>Muestra la fecha actual</span><br>
<strong>whoami</strong> <span>Muestra quién eres</span><br>
<strong>carmen</strong> <span>Información especial sobre ti</span><br>
<strong>history</strong> <span>Muestra el historial de comandos</span><br>
<strong>clear</strong> <span>Limpia la terminal</span><br>
<strong>ls</strong> <span>Lista archivos del corazón</span><br>
<strong>pwd</strong> <span>Muestra el directorio actual</span><br>
<strong>cat [archivo]</strong> <span>Lee el contenido de un archivo</span><br>
<strong>echo [texto]</strong> <span>Echo de tu texto</span><br>
<strong>grep [patrón]</strong> <span>Busca un patrón en el corazón</span><br>
<strong>touch [archivo]</strong> <span>Crea un nuevo recuerdo</span><br>
<strong>mkdir [directorio]</strong> <span>Crea un nuevo espacio en el corazón</span><br>
<strong>cd [directorio]</strong> <span>Cambia de directorio</span><br>
<strong>buenos días</strong> <span>Saludo matutino especial</span><br>
<strong>buenas noches</strong> <span>Saludo nocturno especial</span><br>
<strong>te extraño</strong> <span>Mensaje especial de extrañar</span><br>
<strong>cuánto</strong> <span>Cuánto tiempo llevamos juntos</span><br>
<strong>fecha</strong> <span>Fecha de inicio de nuestra historia</span><br>
<strong>tiempo juntos</strong> <span>Tiempo que llevamos juntos</span><br>
<strong>secreto</strong> <span>Un secreto especial</span><br>
<strong>promesa</strong> <span>Una promesa de amor</span><br>
<strong>motivo</strong> <span>El motivo de mi amor</span><br>
        <strong>futuro</strong> <span>Nuestro futuro juntos</span><br>
        <strong>fotos</strong> <span>Muestra todas nuestras fotos especiales</span><br>
        <strong>foto [número]</strong> <span>Muestra una foto específica (1-${FOTOS.length})</span><br>
        <strong>slideshow</strong> <span>Carrusel automático de nuestras fotos</span><br>
        <strong>next / siguiente</strong> <span>Siguiente foto</span><br>
        <strong>prev / anterior</strong> <span>Foto anterior</span><br>
        <strong>exit</strong> <span>Salir (pero no querrás hacerlo)</span>
</div>
    `;
    addOutput(help);
}

function showLoveMessage() {
    const randomMessage = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
    const heart = '<span class="heart">💕</span>';
    addOutput(`<div class="command-love">${randomMessage} ${heart}</div>`);
}

function showDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const dateString = now.toLocaleDateString('es-ES', options);
    addOutput(`<span class="command-date">${dateString}</span>`);
}

function showWhoami() {
    addOutput(`${CARMEN_NAME} - La persona más especial del mundo 💕<br>La razón de mi felicidad<br>El amor de mi vida<br>Mi capullito hermoso <3`);
}

function showCarmen() {
    const carmenInfo = `
<pre>
Nombre: ${CARMEN_NAME}
Estado: Enamorada 💕
Fecha de inicio: 5 de mayo de 2024
Lugar en mi corazón: El más especial
Nivel de amor: Infinito ♾️
Estado actual: Volviendo a enamorarnos
</pre>
    `;
    addOutput(carmenInfo);
}

function showHistory() {
    if (commandHistory.length === 0) {
        addOutput('No hay historial de comandos aún.');
    } else {
        let history = commandHistory.map((cmd, index) => 
            `<span class="command-history-item">${index + 1}. ${cmd}</span>`
        ).join('<br>');
        addOutput(history);
    }
}

function clearTerminal() {
    const welcome = terminal.querySelector('.welcome-message');
    terminal.innerHTML = '';
    if (welcome) {
        terminal.appendChild(welcome);
    }
}

function showLs() {
    const files = [
        'recuerdos/',
        'sonrisas/',
        'momentos_especiales/',
        'cartas_de_amor.txt',
        'promesas.txt',
        'futuro_juntos.txt',
        'razones_para_amar.txt'
    ];
    addOutput(`<span class="command-success">${files.join('  ')}</span>`);
}

function showPwd() {
    addOutput('<span class="command-success">/home/carmen/corazon</span>');
}

function showCat(filename) {
    const files = {
        'cartas_de_amor.txt': 'Carmen, cada palabra que te escribo viene desde lo más profundo de mi corazón. Eres mi todo.',
        'promesas.txt': 'Prometo amarte cada día, en los buenos y malos momentos. Prometo estar a tu lado siempre.',
        'futuro_juntos.txt': 'Veo un futuro hermoso a tu lado. Juntos podemos lograr cualquier cosa.',
        'razones_para_amar.txt': 'Tus razones para amar son infinitas: tu risa, tu esencia, y esa magia que dejas en todo lo que tocas…'
    };
    
    if (files[filename]) {
        addOutput(`<span class="command-love">${files[filename]}</span>`);
    } else {
        showError(`cat: ${filename}: No such file or directory`);
    }
}

function showEcho(text) {
    if (text) {
        addOutput(`<span class="command-output">${text}</span>`);
    } else {
        addOutput('');
    }
}

function showGrep(pattern) {
    const matches = [
        `Encontré "amor" en: recuerdos/`,
        `Encontré "${pattern}" en: cartas_de_amor.txt`,
        `Encontré "${pattern}" en: razones_para_amar.txt`
    ];
    addOutput(`<span class="command-success">${matches.join('<br>')}</span>`);
}

function showTouch(filename) {
    addOutput(`<span class="command-success">Archivo "${filename}" creado con éxito en el corazón 💕</span>`);
}

function showRm(filename) {
    if (filename) {
        addOutput(`<span class="command-success">No puedo eliminar nada de mi corazón, todo es especial 💕</span>`);
    } else {
        showError('rm: falta el argumento de archivo');
    }
}

function showMkdir(dirname) {
    addOutput(`<span class="command-success">Directorio "${dirname}" creado en el corazón 💕</span>`);
}

function showCd(dirname) {
    if (dirname === '~' || dirname === 'home') {
        addOutput(`<span class="command-success">Cambiado a: /home/carmen/corazon</span>`);
    } else {
        addOutput(`<span class="command-success">Cambiado a: /home/carmen/corazon/${dirname}</span>`);
    }
}

function showWelcome() {
    const welcome = `
<div class="command-love">
Bienvenida de nuevo, Carmen 💕<br>
Esta terminal fue creada con mucho amor solo para ti.<br>
Cada comando es una forma de decirte cuánto te amo.<br>
Eres especial y única en mi vida.
</div>
    `;
    addOutput(welcome);
}

function showGoodMorning() {
    const message = SPECIAL_MESSAGES.good_morning[
        Math.floor(Math.random() * SPECIAL_MESSAGES.good_morning.length)
    ];
    addOutput(`<div class="command-love">${message}</div>`);
}

function showGoodNight() {
    const message = SPECIAL_MESSAGES.good_night[
        Math.floor(Math.random() * SPECIAL_MESSAGES.good_night.length)
    ];
    addOutput(`<div class="command-love">${message}</div>`);
}

function showMissYou() {
    const message = SPECIAL_MESSAGES.miss_you[
        Math.floor(Math.random() * SPECIAL_MESSAGES.miss_you.length)
    ];
    addOutput(`<div class="command-love">${message}</div>`);
}

function showCuanto() {
    const now = new Date();
    const diff = now - START_DATE;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    let timeString = '';
    if (years > 0) {
        timeString += `${years} año${years > 1 ? 's' : ''}, `;
    }
    if (months > 0) {
        timeString += `${months % 12} mes${months % 12 > 1 ? 'es' : ''}, `;
    }
    timeString += `${days % 30} día${days % 30 > 1 ? 's' : ''}`;
    
    addOutput(`<div class="command-love">Llevamos juntos: ${timeString} 💕<br>Desde el 5 de mayo de 2024<br>Cada día contigo es un regalo</div>`);
}

function showStartDate() {
    addOutput(`<div class="command-love">Nuestra historia comenzó el:<br><strong>5 de mayo de 2024</strong> 💕<br>El día más especial de mi vida</div>`);
}

function showTimeTogether() {
    const now = new Date();
    const diff = now - START_DATE;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    addOutput(`<div class="command-love">
Tiempo juntos:<br>
${days} días<br>
${hours} horas<br>
${minutes} minutos<br>
Y contando... 💕
</div>`);
}

function showSecret() {
    const secrets = [
        "Mi secreto es que te amo más cada día, incluso en los momentos difíciles.",
        "Mi secreto es que siempre he sabido que eras tu.",
        "Mi secreto es que estoy volviendo a enamorarme de ti cada día más.",
        "Mi secreto es que guardo cada momento contigo en mi corazón para siempre."
    ];
    const secret = secrets[Math.floor(Math.random() * secrets.length)];
    addOutput(`<div class="command-love">${secret}</div>`);
}

function showPromise() {
    const promises = [
        "Te prometo que siempre estaré a tu lado, en las buenas y en las malas.",
        "Te prometo que nuestro amor crecerá cada día, incluso después de los momentos difíciles.",
        "Te prometo que juntos superaremos cualquier obstáculo que se nos presente.",
        "Te prometo amarte incondicionalmente, porque eres mi persona especial."
    ];
    const promise = promises[Math.floor(Math.random() * promises.length)];
    addOutput(`<div class="command-love">${promise}</div>`);
}

function showReason() {
    const reasons = [
        "El motivo de mi amor es simple: eres Carmen, y eso es suficiente.",
        "El motivo es tu sonrisa, tu forma de ser, como te saco de quisio xD... todo en ti.",
        "El motivo es que siempre he sabido que eras tu.",
        "El motivo es que estás volviendo a enamorarme, y eso es mágico."
    ];
    const reason = reasons[Math.floor(Math.random() * reasons.length)];
    addOutput(`<div class="command-love">${reason}</div>`);
}

function showFuture() {
    const futures = [
        "Veo un futuro hermoso a tu lado, lleno de amor, risas, momentos especiales y uno que otro maltrato xD.",
        "Nuestro futuro juntos será increíble. Superaremos estos momentos difíciles y seremos más fuertes.",
        "El futuro nos depara cosas hermosas. Juntos podemos lograr cualquier cosa.",
        "Veo nuestro futuro lleno de amor, crecimiento y felicidad. Eres mi compañera de vida y mi capullito hermoso <3."
    ];
    const future = futures[Math.floor(Math.random() * futures.length)];
    addOutput(`<div class="command-love">${future}</div>`);
}

function showExit() {
    addOutput(`<div class="command-love">No quiero que te vayas, Carmen 💕<br>Pero si debes irte, recuerda que siempre estaré aquí para ti.<br>Escribe cualquier comando para volver.</div>`);
}

// Funciones para mostrar fotos
function showFotos() {
    let galleryHTML = `
        <div class="fotos-gallery">
            <div class="gallery-header">
                <h3>💕 Nuestros Recuerdos Especiales 💕</h3>
                <p>Cada foto es un momento que guardo en mi corazón</p>
            </div>
            <div class="fotos-grid">
    `;
    
    FOTOS.forEach((foto, index) => {
        galleryHTML += `
            <div class="foto-item" onclick="showFotoModal(${index + 1})">
                <img src="${foto}" alt="Recuerdo ${index + 1}" loading="lazy">
                <div class="foto-overlay">
                    <span class="foto-number">Foto ${index + 1}</span>
                </div>
            </div>
        `;
    });
    
    galleryHTML += `
            </div>
            <div class="gallery-footer" style="line-height: 0.1 !important;">
                <p>Escribe <strong>foto [número]</strong> para ver una foto específica</p>
                <p>Escribe <strong>slideshow</strong> para ver un carrusel automático</p>
            </div>
        </div>
    `;
    
    addOutput(galleryHTML);
}

function showFoto(num) {
    if (num < 1 || num > FOTOS.length) {
        showError(`Foto no encontrada. Disponibles: 1-${FOTOS.length}`);
        return;
    }
    
    currentPhotoIndex = num - 1;
    const foto = FOTOS[currentPhotoIndex];
    
    const fotoHTML = `
        <div class="foto-container">
            <div class="foto-header">
                <span class="foto-title">💕 Recuerdo ${num} de ${FOTOS.length} 💕</span>
                <div class="foto-controls">
                    ${num > 1 ? `<button onclick="showFotoModal(${num - 1})" class="foto-btn">← Anterior</button>` : ''}
                    ${num < FOTOS.length ? `<button onclick="showFotoModal(${num + 1})" class="foto-btn">Siguiente →</button>` : ''}
                </div>
            </div>
            <div class="foto-wrapper">
                <img src="${foto}" alt="Recuerdo ${num}" class="foto-display">
                <div class="foto-message" style="line-height: 0.1 !important;">
                    <p>Un momento especial que guardo en mi corazón 💕</p>
                    <p>Cada foto con mi capullito es un tesoro</p>
                </div>
            </div>
            <div class="foto-nav">
                ${num > 1 ? `<button onclick="showFotoModal(${num - 1})" class="nav-btn">◀</button>` : '<span class="nav-btn disabled">◀</span>'}
                <span class="nav-info">${num} / ${FOTOS.length}</span>
                ${num < FOTOS.length ? `<button onclick="showFotoModal(${num + 1})" class="nav-btn">▶</button>` : '<span class="nav-btn disabled">▶</span>'}
            </div>
        </div>
    `;
    
    addOutput(fotoHTML);
    scrollToBottom();
}

// Función global para mostrar foto desde el onclick (necesaria para onclick)
window.showFotoModal = function(num) {
    // Limpiar cualquier foto previa
    const existing = document.querySelectorAll('.foto-container, .fotos-gallery');
    existing.forEach(el => el.remove());
    
    // Mostrar la foto directamente
    showFoto(num);
    scrollToBottom();
};

function nextFoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % FOTOS.length;
    showFoto(currentPhotoIndex + 1);
}

function prevFoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + FOTOS.length) % FOTOS.length;
    showFoto(currentPhotoIndex + 1);
}

let slideshowInterval = null;

function startSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        addOutput('<div class="command-success">Slideshow detenido</div>');
        return;
    }
    
    addOutput('<div class="command-success">Iniciando slideshow... Escribe "slideshow" nuevamente para detenerlo 💕</div>');
    
    // Mostrar primera foto
    currentPhotoIndex = 0;
    showFoto(1);
    
    // Cambiar foto cada 5 segundos
    slideshowInterval = setInterval(() => {
        nextFoto();
    }, 5000);
}

// Prevenir que la página se recargue al presionar Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target === terminalInput) {
        e.preventDefault();
    }
});

// Mantener el foco en el input
terminal.addEventListener('click', () => {
    terminalInput.focus();
});

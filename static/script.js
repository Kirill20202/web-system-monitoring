// Переменные для истории и графика
let load1History = [];
let load5History = [];
let load15History = [];
let labels = [];

// Глобальная переменная для графика
let loadChart = null;

// Функция для создания графика
function createChart() {
    const ctx = document.getElementById('loadChart').getContext('2d');
    loadChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '1 min',
                    data: load1History,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.3
                },
                {
                    label: '5 min',
                    data: load5History,
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    tension: 0.3
                },
                {
                    label: '15 min',
                    data: load15History,
                    borderColor: '#45b7d1',
                    backgroundColor: 'rgba(69, 183, 209, 0.1)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time (updates every 5s)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Load Average'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Загружаем данные
async function fetchUptime() {
    try {
        const response = await fetch('/api/uptime');
        const data = await response.json();
        if (data.uptime) {
            document.getElementById('uptime').textContent = `Uptime: ${data.uptime}`;
        } else {
            document.getElementById('uptime').textContent = `Error: ${data.error}`;
        }
    } catch (err) {
        document.getElementById('uptime').textContent = `Failed to load uptime: ${err.message}`;
    }
}

async function fetchLoadAvg() {
    try {
        const response = await fetch('/api/loadavg');
        const data = await response.json();
        if (data.load_1min !== undefined) {
            document.getElementById('loadavg').textContent =
                `Load Average: ${data.load_1min} (1m) | ${data.load_5min} (5m) | ${data.load_15min} (15m)`;

            // Добавляем данные в историю
            const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            labels.push(now);
            load1History.push(data.load_1min);
            load5History.push(data.load_5min);
            load15History.push(data.load_15min);

            // Убираем старые данные
            if (labels.length > 20) {
                labels.shift();
                load1History.shift();
                load5History.shift();
                load15History.shift();
            }

            // Обновляем график, если он уже создан
            if (loadChart) {
                loadChart.update();
            }
        } else {
            document.getElementById('loadavg').textContent = `Error: ${data.error}`;
        }
    } catch (err) {
        document.getElementById('loadavg').textContent = `Failed to load loadavg: ${err.message}`;
    }
}

async function fetchMemInfo() {
    try {
        const response = await fetch('/api/meminfo');
        const data = await response.json();
        if (data.mem_total_mb !== undefined) {
            const used = data.mem_total_mb - data.mem_available_mb;
            const percent = ((used / data.mem_total_mb) * 100).toFixed(1);
            document.getElementById('meminfo').textContent =
                `Memory: ${used} MB / ${data.mem_total_mb} MB (${percent}%) — Available: ${data.mem_available_mb} MB`;
        } else {
            document.getElementById('meminfo').textContent = `Error: ${data.error}`;
        }
    } catch (err) {
        document.getElementById('meminfo').textContent = `Failed to load memory: ${err.message}`;
    }
}

async function fetchTop() {
    try {
        const response = await fetch('/api/top');
        const data = await response.json();
        if (data.processes && Array.isArray(data.processes)) {
            const content = data.processes.join('\n');
            document.getElementById('top-content').textContent = content;
        } else {
            document.getElementById('top-content').textContent = `Error: ${data.error}`;
        }
    } catch (err) {
        document.getElementById('top-content').textContent = `Failed to load processes: ${err.message}`;
    }
}

// Ожидаем, пока Chart.js загрузится
window.addEventListener('DOMContentLoaded', () => {
    // Запускаем все функции
    fetchUptime();
    fetchLoadAvg();
    fetchMemInfo();
    fetchTop();

    // Создаём график только после загрузки Chart.js
    if (typeof Chart !== 'undefined') {
        createChart();
    } else {
        // Если Chart.js ещё не загружен — ждём
        setTimeout(() => {
            if (typeof Chart !== 'undefined') {
                createChart();
            }
        }, 1000);
    }

    // Автообновление каждые 5 секунд
    setInterval(() => {
        fetchUptime();
        fetchLoadAvg();
        fetchMemInfo();
        fetchTop();
    }, 5000);
});
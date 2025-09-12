// Переменные для истории и графика
let load1History = [];
let load5History = [];
let load15History = [];
let labels = [];

// Глобальная переменная для графика
let loadChart = null;

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
        console.log(data)
        if (data !== undefined) {
            document.getElementById('loadavg').textContent =
                `Load Average: ${data.load1} (1m) | ${data.load5} (5m) | ${data.load15} (15m)`;

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

    // Автообновление каждые 5 секунд
    setInterval(() => {
        fetchUptime();
        fetchLoadAvg();
        fetchMemInfo();
        fetchTop();
    }, 5000);
});
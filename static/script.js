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
        document.getElementById('uptime').textContent = `Failed to load: ${err.message}`;
    }
}

// Загружаем при старте
fetchUptime();

// Обновляем каждые 5 секунд
setInterval(fetchUptime, 5000);
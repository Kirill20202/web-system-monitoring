async function fetchData() {
    try {
        // Uptime
        const uptimeRes = await fetch('/api/uptime');
        const uptimeData = await uptimeRes.json();
        document.getElementById('uptime').textContent = uptimeData.uptime || 'Error';

        // Load Average
        const loadRes = await fetch('/api/loadavg');
        const loadData = await loadRes.json();
        if (loadData.load1) {
            document.getElementById('loadavg').textContent =
                `1 min: ${loadData.load1} | 5 min: ${loadData.load5} | 15 min: ${loadData.load15}`;
        } else {
            document.getElementById('loadavg').textContent = loadData.error || 'Error';
        }
    } catch (err) {
        console.error(err);
        document.getElementById('uptime').textContent = 'Failed to load data';
        document.getElementById('loadavg').textContent = 'Failed to load data';
    }
}

fetchData();
setInterval(fetchData, 5000);
// heartbeat.js - Keeps the container alive with periodic heartbeats

console.log('Heartbeat system initialized');

// Function to send heartbeat
async function sendHeartbeat() {
    try {
        const response = await fetch('/heartbeat', {
            method: 'POST',
            credentials: 'include',  // Include cookies
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('Heartbeat sent successfully');
            // Update UI if elements exist
            if (document.getElementById('heartbeatStatus')) {
                document.getElementById('heartbeatStatus').textContent = 'Active ❤️';
            }
            if (document.getElementById('lastHeartbeat')) {
                document.getElementById('lastHeartbeat').textContent = new Date().toLocaleTimeString();
            }
        } else {
            console.warn('Heartbeat failed:', response.status);
            if (document.getElementById('heartbeatStatus')) {
                document.getElementById('heartbeatStatus').textContent = 'Warning ⚠️';
            }
        }
    } catch (error) {
        console.error('Heartbeat error:', error);
        if (document.getElementById('heartbeatStatus')) {
            document.getElementById('heartbeatStatus').textContent = 'Error ❌';
        }
    }
}

// Send initial heartbeat when page loads
sendHeartbeat();

// Send heartbeat every 30 seconds to keep the container alive
// (TTL is 120 seconds, so 30s interval gives us good buffer)
setInterval(sendHeartbeat, 30_000);

// Optional: Send heartbeat when page becomes visible again
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('Page became visible, sending heartbeat');
        sendHeartbeat();
    }
});

console.log('Heartbeat scheduled every 30 seconds');

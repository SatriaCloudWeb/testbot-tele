const http = require('http');

// Fungsi untuk keep alive bot di Replit
function keepAlive() {
  setInterval(() => {
    http.get(`http://localhost:${process.env.PORT || 8080}`, (res) => {
      console.log(`Keep-alive ping: ${res.statusCode}`);
    }).on('error', (err) => {
      console.log('Keep-alive error:', err.message);
    });
  }, 5 * 60 * 1000); // Ping setiap 5 menit
}

module.exports = keepAlive;

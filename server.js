const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

app.use(cors());

// Proxy endpoint
app.use('/api', createProxyMiddleware({
  target: 'http://37.27.3.73/', // The server you want to proxy to
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Optionally, add headers or modify the request
    proxyReq.setHeader('Origin', 'http://37.27.3.73/');
  },
}));

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
require('dotenv').config()

const url = process.env.SERVER;

const addHeaders = (req, res, next) => {
    req.headers['bypass-tunnel-reminder'] = true;
    next();
};

app.use(addHeaders);

app.use('/', createProxyMiddleware({
    target: url,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('bypass-tunnel-reminder', true);
    },
    xfwd: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

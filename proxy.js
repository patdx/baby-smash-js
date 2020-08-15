const httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
const server = httpProxy.createProxyServer({ target: 'http://localhost:3000' });
server.on('proxyReq', (proxyReq, req, res) => {
    res.on("close", () => {
        console.log(proxyReq.path, res.statusCode);
    })
    
//   res.on('end', () => {
    
//   });
});
server.listen(4000);

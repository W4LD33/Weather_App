const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.api-ninjas.com',
      changeOrigin: true,
      headers: {
        'X-Api-Key': 'CRu6zFFZMqCAeSwMRdZJLg==HqHGlRBF5SJZ4cuZ',
        'Access-Control-Allow-Origin': '*'
      }
    })
  );
};

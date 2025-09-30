// ملف: src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'mohamedsherif-sadq.syria-cloud.info/back/public', // <-- البورت والدومين المطلوب
      changeOrigin: true,
      timeout: 100000, // <-- زيادة المهلة إلى 60 ثانية لتجنب 504 Gateway Timeout
    })
  );
};

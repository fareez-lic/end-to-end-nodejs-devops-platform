const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// Home endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 DevOps Node App is Live!',
    version: '1.0.0',
    author: 'fareez-lic',
    status: 'running'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// About endpoint
app.get('/about', (req, res) => {
  res.json({
    project: 'End-to-End DevOps Project',
    tools: [
      'Node.js',
      'Docker',
      'Jenkins',
      'Kubernetes',
      'Nginx',
      'Terraform'
    ]
  });
});

// Start the server only when this file is run directly.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;

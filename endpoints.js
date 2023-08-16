const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  const endpointsFilePath = path.join(__dirname, 'endpoints.json');
  const endpointsData = fs.readFileSync(endpointsFilePath, 'utf8');
  const endpoints = JSON.parse(endpointsData);
  res.status(200).json(endpoints);
});

module.exports = router;
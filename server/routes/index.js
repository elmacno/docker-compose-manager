const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ page: 'index', contents: { title: 'Express' } });
});

module.exports = router;

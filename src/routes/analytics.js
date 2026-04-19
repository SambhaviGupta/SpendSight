const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyBreakdown,
  getPLReport
} = require('../controllers/analyticsController');

router.get('/summary', auth, getSummary);
router.get('/category', auth, getCategoryBreakdown);
router.get('/monthly', auth, getMonthlyBreakdown);
router.get('/pl', auth, getPLReport);

module.exports = router;
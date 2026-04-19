const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

exports.getSummary = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }}
    ]);

    let income = 0, expense = 0;
    result.forEach(r => {
      if (r._id === 'income') income = r.total;
      if (r._id === 'expense') expense = r.total;
    });

    res.json({ income, expense, balance: income - expense });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCategoryBreakdown = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: {
        userId: new mongoose.Types.ObjectId(req.user.id),
        type: 'expense'
      }},
      { $group: {
        _id: '$category',
        total: { $sum: '$amount' }
      }},
      { $sort: { total: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMonthlyBreakdown = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: {
        _id: {
          month: { $month: '$date' },
          year: { $year: '$date' },
          type: '$type'
        },
        total: { $sum: '$amount' }
      }},
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPLReport = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: {
        _id: {
          month: { $month: '$date' },
          year: { $year: '$date' },
          type: '$type'
        },
        total: { $sum: '$amount' }
      }},
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const report = {};
    result.forEach(r => {
      const key = `${r._id.year}-${r._id.month}`;
      if (!report[key]) report[key] = { income: 0, expense: 0 };
      report[key][r._id.type] = r.total;
    });

    const pl = Object.entries(report).map(([period, data]) => ({
      period,
      income: data.income,
      expense: data.expense,
      net: data.income - data.expense
    }));

    res.json(pl);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
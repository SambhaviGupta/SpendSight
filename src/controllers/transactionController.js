const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;
    const transaction = new Transaction({
      userId: req.user.id,
      title, amount, category, type, date
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = { userId: req.user.id };

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Not found' });
    if (transaction.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await transaction.deleteOne();
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
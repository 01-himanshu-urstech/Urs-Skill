const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  amount: Number,
  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED']
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);

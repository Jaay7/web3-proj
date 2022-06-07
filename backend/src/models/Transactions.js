import { Schema, model } from 'mongoose';

const TransactionsSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
}, {
  timestamps: false,
});

const Transactions = model('Transactions', TransactionsSchema);

export default Transactions;

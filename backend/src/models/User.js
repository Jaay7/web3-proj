import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
    unique: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  walletAdded: {
    type: Boolean,
    default: false,
  },
  walletAddress: {
    type: String,
    unique: true,
  },
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transactions',
  }],
  emailVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString(),
  },
}, {
  timestamps: false,
});

const User = model('User', UserSchema);

export default User;

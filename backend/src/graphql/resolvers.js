/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import bcrypt from 'bcryptjs';
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import User from '../models/User';
import Transactions from '../models/Transactions';
import { issueToken, getAuthUser, getRefreshTokenUser } from '../utils/authentication';

const resolvers = {
  Query: {
    me: async (root, args, { req }) => {
      const authUser = await getAuthUser(req, true);
      return User.findById(authUser.id);
    },
    user: async (root, args, { req }) => {
      await getAuthUser(req, true);
      return User.findOne({ username: args.username });
    },
    users: async (root, args, { req }) => {
      await getAuthUser(req, true);
      return User.find({});
    },
    refreshToken: async (root, args, { req }) => {
      const authUser = await getRefreshTokenUser(req, true);
      const tokens = await issueToken(authUser);
      return {
        message: 'Refresh token issued successfully',
        ...tokens,
      };
    },
    getAllTransactions: async (root, args, { req }) => {
      const authUser = await getAuthUser(req, true);
      return Transactions.find({ sender: authUser.id });
    },
    getTransaction: async (root, args, { req }) => {
      await getAuthUser(req, true);
      return Transactions.findById(args.transactionId);
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (user) {
        return {
          message: 'Username already exists',
          token: null,
          refreshToken: null,
        };
      }
      // firebase
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, args.email, args.password)
        .then((fuser) => {
          fuser.user.sendEmailVerification();
        })
        .catch((err) => console.log(err));
      args.password = await bcrypt.hash(args.password, 10);
      const newUser = await User.create(args);
      const tokens = await issueToken(newUser);
      return {
        message: 'User created successfully',
        ...tokens,
      };
    },
    login: async (root, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        return {
          message: 'User not found',
          token: null,
          refreshToken: null,
        };
      }
      const isValid = await bcrypt.compare(args.password, user.password);
      if (!isValid) {
        return {
          message: 'Invalid password',
          token: null,
          refreshToken: null,
        };
      }
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, args.email, args.password)
        .catch((err) => console.log(err));
      const tokens = await issueToken(user);
      return {
        message: 'User logged in successfully',
        ...tokens,
      };
    },
    addWallet: async (root, args, { req }) => {
      const authUser = await getAuthUser(req, true);
      if (authUser.walletAdded) {
        return 'Wallet already added';
      }
      authUser.walletAdded = true;
      authUser.walletAddress = args.walletAddress;
      await authUser.save();
      return 'Wallet added successfully';
    },
    updateUser: async (root, args, { req }) => {
      const authUser = await getAuthUser(req, true);
      await User.findByIdAndUpdate(authUser.id, args, { new: true });
      return 'User updated successfully';
    },
    addTransaction: async (root, args, { req }) => {
      const authUser = await getAuthUser(req, true);
      const receiver = await User.findOne({ walletAddress: args.receiver });
      await Transactions.create({
        sender: authUser.id,
        receiver: receiver.id,
        amount: args.amount,
        message: args.message,
      });
      return 'Transaction added successfully';
    },
  },
  User: {
    transactions: async (root, args, { req }) => {
      const authUser = await getAuthUser(req, true);
      return Transactions.find({ sender: authUser.id });
    },
  },
  Transactions: {
    sender: async (root, args, { req }) => {
      await getAuthUser(req, true);
      return User.findById(root.sender);
    },
    receiver: async (root, args, { req }) => {
      await getAuthUser(req, true);
      return User.findById(root.receiver);
    },
  },
};

export default resolvers;

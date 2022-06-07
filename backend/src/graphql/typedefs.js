import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    me: User
    user(username: String!): User
    users: [User]
    refreshToken: Auth
    getAllTransactions: [Transactions]
    getTransaction(transactionId: ID!): Transactions
  }
  type User {
    id: ID!
    username: String!
    email: String!
    fullName: String!
    avatar: String
    userType: String
    phoneNumber: String!
    walletAdded: Boolean
    walletAddress: String
    transactions: [Transactions!]!
    emailVerified: Boolean
    phoneVerified: Boolean
    createdAt: String!
  }
  type Auth {
    message: String
    token: String!
    refreshToken: String!
  }
  type Transactions {
    id: ID!
    sender: User!
    receiver: User!
    message: String!
    amount: Float!
    dateTime: String!
  }
  type Mutation {
    createUser(
      username: String!
      email: String!
      fullName: String!
      avatar: String
      password: String!
      userType: String
      phoneNumber: String!
    ): Auth
    login(email: String!, password: String!): Auth
    PhoneNumberForOTP(phoneNumber: String!): String
    verifyOTP(phoneNumber: String!, otp: String!): Auth
    addWallet(walletAddress: String!): String
    updateUser(
      username: String!
      email: String!
      fullName: String!
      gender: String!
      avatar: String
      userType: String
      phoneNumber: String!
    ): String
    addTransaction(
      receiver: ID!
      amount: Float!
      message: String!
      dateTime: String!
    ): String
  }
`;

export default typeDefs;

import React from 'react'
import Welcome from './components/screens/dashboard/Welcome';
import Services from './components/screens/dashboard/Services';
import Transactions from './components/screens/dashboard/Transactions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/screens/dashboard/index';
import LandingPage from './components/screens/LandingPage';
import Wallet from './components/screens/Wallet';
import MakePayment from './components/screens/dashboard/MakePayment';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import ConnectWallet from './components/auth/ConnectWallet';
import Profile from './components/screens/Profile';

function App() {

  return (
    <div
      style={{
        minHeight: '100vh',
        // backgroundColor: '#000000',
        // backgroundImage: 'linear-gradient(315deg, #000000 0%, #958e69 74%)',
        // background: '#abbaab',
        // background: '-webkit-linear-gradient(to right, #abbaab, #ffffff)',
        // background: 'linear-gradient(to right, #abbaab, #ffffff)'
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="/home" element={<Welcome />} />
            <Route path="/services" element={<Services />} />
            <Route path="/transactions-history" element={<Transactions />} />
            <Route path="/my-wallet" element={<Wallet />} />
            <Route path="/make-payment" element={<MakePayment />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
        </Routes>
      </BrowserRouter>
      {/* <NavBar /> */}
    </div>
  )
}

export default App

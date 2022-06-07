import React from 'react'
import { TextField, Typography, Button, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate, Link, Navigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { useMutation, gql } from '@apollo/client';
import { TransactionContext } from '../../context/TransactionContext';

const add_wallet = gql`
  mutation AddWallet($walletAddress: String!) {
    addWallet(walletAddress: $walletAddress)
  }
`;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 300
  },
  links: {
    color: '#6c8780',
    textDecoration: 'none',
  }
})

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#52635e',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#52635e',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '40px',
    '&.Mui-focused fieldset': {
      borderColor: '#52635e',
    },
  },
});

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  marginTop: '10px',
  padding: '10px 30px',
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  border: '2px solid #293934',
  borderRadius: '1rem',
  backgroundColor: '#293934',
  textTransform: 'Capitalize',
  color: '#f2f2f2',
  transition: 'all 0.3s ease-in-out',
  fontWeight: 500,
  '&:hover': {
    color: '#293934da',
    backgroundColor: 'transparent',
    border: '2px solid #293934',
  }
}));

const ConnectWallet = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { connectWallet, currentAccount } = React.useContext(TransactionContext);

  const [ addWallet, {data, loading, error}] = useMutation(add_wallet, {
    variables: {
      walletAddress: currentAccount
    },
    context: {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    },
    onCompleted: (data) => {
      if(data.addWallet) {
        localStorage.setItem('wallet', 'connected');
        navigate('/home');
      }
    }
  });

  if(!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }

  if(localStorage.getItem('token') && localStorage.getItem('wallet') === 'connected') {
    return <Navigate to="/home" />
  }

  return (
    <>
    <div className={classes.container}>
      <div className={classes.form}>
        { error && <Typography color="red">Oops! Something went wrong.{error.message}</Typography> }
        <Typography variant="h6">Connect Wallet</Typography>
        <ContainedButton
          onClick={async() => {
            await connectWallet();
            await addWallet();
          }}
        >{loading ? <CircularProgress size={28} color="inherit" /> : "Connect Wallet"}</ContainedButton>
        <Typography style={{marginTop: 10}}>Wants to Change account? <Link to="/login" className={classes.links}>Login here</Link></Typography>
      </div>
    </div>
    </>
  )
}

export default ConnectWallet
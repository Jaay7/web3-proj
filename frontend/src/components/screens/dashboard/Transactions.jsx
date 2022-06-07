import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Stack, Divider } from '@mui/material';
import { TransactionContext } from '../../../context/TransactionContext';

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  marginTop: 16,
  padding: '20px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  [theme.breakpoints.up('sm')]: {
    padding: '20px 60px',
    marginTop: 0,
  },
}));

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: 'blur(10px)',
  // backgroundColor: '#ffffff0d',
  borderRadius: '0.5rem',
  color: 'white',
  width: 'max-content',
  backgroundColor: '#403340aa',
  // backgroundImage: 'linear-gradient(to right, #12c2e990, #c471ed, #f64f59)',
  padding: '1rem',
  boxShadow: '2px 2px 8px #00000060',
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  }
}));

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, amount, url }) => {
  return (
    <StyledCard>
      <Typography variant="subtitle2" style={{overflowWrap: 'anywhere'}}>From: {addressFrom}</Typography>
      <Typography variant="subtitle2" style={{overflowWrap: 'anywhere'}}>To: {addressTo}</Typography>
      <Typography variant="subtitle2" style={{overflowWrap: 'anywhere'}}>Amount: {amount} ETH</Typography>
      <Typography variant="subtitle2" style={{overflowWrap: 'anywhere'}}>{ message && <>Message: {message}</> }</Typography>
      <Typography variant="subtitle2" style={{overflowWrap: 'anywhere'}}>Time: {timestamp}</Typography>
    </StyledCard>
  )
}

const Transactions = () => {
  const theme = useTheme();
  const { currentAccount, transactions } = React.useContext(TransactionContext);

  const screen = theme.breakpoints.down('md');

  return (
    <StyledDiv>
      <Typography variant="h6" style={{fontWeight: 'bold', color: '#464646'}} gutterBottom>My Transactions</Typography>
      <Divider style={{marginBottom: 16 }} />
      { currentAccount ?
        <Stack
          spacing={2}
          direction={screen ? "column" : "row"}
        >
          {transactions.reverse().map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </Stack> :
        <Typography style={{fontWeight: 'bold'}}>
          Please connect to wallet to view your transactions
        </Typography>
      }
      
    </StyledDiv>
  )
}

export default Transactions
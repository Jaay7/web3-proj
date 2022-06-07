import React from 'react'
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Toolbar, Button, Container, Icon } from '@mui/material';
import { TransactionContext } from '../../../context/TransactionContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  matter: {
    color: '#fff',
    textAlign: 'start',
    padding: '1rem',
    // alignSelf: 'flex-start',
  },
})

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  marginTop: '4rem',
  padding: '20px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  // position: 'absolute',
  [theme.breakpoints.up('sm')]: {
    padding: '20px 60px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '20px 100px',
    flexDirection: 'row',
  }
}));

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  marginTop: 20,
  width: 'max-content',
  padding: '8px 30px',
  borderRadius: 50,
  border: '1.5px solid #293934',
  textTransform: 'capitalize',
  color: '#e2e2e2',
  backgroundColor: '#000',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#000',
    opacity: 0.8,
}
}));

const Welcome = () => {
  const { connectWallet, currentAccount, formData, handlechange, sendTransaction, isLoading } = React.useContext(TransactionContext);

  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Toolbar />
      {currentAccount ? 
      <StyledDiv>
        <div className={classes.matter}>
          {/* <Typography variant="h4">Send Crypto across the World</Typography>
          <Typography variant="body1" sx={{mt: 1}}>
            Crypto Currency is a decentralized, open-source, peer-to-peer,
            blockchain-based cryptocurrency.
          </Typography> */}
          
          <Typography variant="body1" style={{ marginTop: 30, backgroundColor: '#42ba96', width: 'max-content', padding: '6px 12px', borderRadius: 20}}>Yay!🎉 Connected to Wallet!</Typography> 
          <Container maxWidth="md" style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 0
          }}>
            <ContainedButton component={Link} to="/make-payment" style={{height: '4.5rem', borderRadius: '1rem', marginRight: 16}}>
              <Icon baseClassName="material-icons-round">paid</Icon>
              <Typography variant="body1" style={{marginLeft: '1rem'}}>Send Money</Typography>
            </ContainedButton>
            <ContainedButton component={Link} to="/transactions-history" style={{height: '4.5rem', borderRadius: '1rem', marginRight: 16}}>
              <Icon baseClassName="material-icons-round">currency_exchange</Icon>
              <Typography variant="body1" style={{marginLeft: '1rem'}}>Check Transactions History</Typography>
            </ContainedButton>
          </Container>
        </div>
        <br />
        <div className={classes.matter}>
          <Icon baseClassName="material-icons-round" style={{fontSize: '16rem', color: '#F7931A'}}>payments</Icon>
        </div>
      </StyledDiv> :
      <div style={{display: 'grid', placeItems: 'center', minHeight: '80vh', color: 'white'}}>
        <div>
          <Typography variant="body1">You haven't connect your wallet yet.</Typography>
          <ContainedButton
            variant="contained"
            onClick={connectWallet}
            >
            Connect Wallet
          </ContainedButton>
        </div>
      </div>
    }
    </>
  )
}

export default Welcome
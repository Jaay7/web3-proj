import React from 'react'
import { Divider, Icon, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Ethereum from '../../assets/ethereum.svg';
import Card from '../../assets/card.png';
import { TransactionContext } from '../../context/TransactionContext';

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

const StyledEthCard = styled((props) => <div {...props} />)(({ theme }) => ({
  color: 'white',
  backgroundImage: `url(${Card});`,
  borderRadius: '0.5rem',
  width: 400,
  height: 200,
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '1rem',
  boxShadow: '0px 0px 10px #0000003d',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('sm')]: {
    width: 300,
    height: 180,
  },
}));

const Wallet = () => {

  const { currentAccount } = React.useContext(TransactionContext);
  
  return (
    <StyledDiv>
      <Typography variant="h6" style={{fontWeight: 'bold', color: '#464646'}} gutterBottom>My Wallets</Typography>
      <Divider style={{marginBottom: 16 }} />
      { currentAccount ? <StyledEthCard>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <img src={Ethereum} height={32} width={32} alt="" style={{border: '2px solid white', padding: 5, borderRadius: 50}} />
          <IconButton
            color="inherit"
            >
            <Icon baseClassName="material-icons-round">info</Icon>
          </IconButton>
        </div>
        <div>
          <Typography variant="body1" style={{overflowWrap: 'anywhere'}}>{currentAccount ? currentAccount : "Address"}</Typography>
          <Typography variant="h6">Ethereum</Typography>
        </div>
      </StyledEthCard> :
        <Typography variant="h6">
          Please connect to wallet to view your transactions
        </Typography>
      }
    </StyledDiv>
  )
}

export default Wallet
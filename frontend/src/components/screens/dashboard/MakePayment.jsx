import React from 'react'
import { styled } from '@mui/material/styles';
import { Typography, Button, TextField, CircularProgress, Toolbar, Dialog, DialogContent, Icon } from '@mui/material';
import { TransactionContext } from '../../../context/TransactionContext';
import PropTypes from 'prop-types';

const StyledTextField = styled(TextField)({
  marginTop: '1rem',
  // '.MuiFilledInput-root': {
  //   color: '#fff',  
  // },
  '& label': {
      color: '#727272',
  },
  '& label.Mui-focused': {
    color: '#232323',
  },
  '& .MuiFilledInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#232323',
    },
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: '#232323',
  },
});

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  padding: '20px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    padding: '20px 80px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '20px 160px',
  }
}));

const StyledForm = styled((props) => <div {...props} />)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '1rem',
  backdropFilter: 'blur(10px)',
  backgroundColor: '#ffffff0d',
  borderRadius: '0.5rem',
  padding: '1rem',
  boxShadow: '0px 0px 10px #00000060',
  width: 400,
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
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


const PaymentDialog = (props) => {
  const { onClose, open, isLoading } = props;

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // transitionDuration={!isLoading && 5000}
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200}}>
          <Icon baseClassName="material-icons-round" style={{alignSelf: 'flex-end', position: 'absolute', top: 10, right: 10}}>close</Icon>
        {isLoading ?
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CircularProgress size={56} color="inherit" /> 
            <Typography variant="h6" gutterBottom>Payment</Typography>
          </div> :
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Icon baseClassName="material-icons-round" style={{color:'#42ba96', fontSize: 64}}>verified</Icon>
            <Typography variant="h6" gutterBottom>Payment done</Typography>
          </div>
        }
        </div>
      </DialogContent>
    </Dialog>
  )
}

PaymentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const MakePayment = () => {
  const { connectWallet, currentAccount, formData, handlechange, sendTransaction, isLoading, openDialog, handleCloseDialog } = React.useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;
    console.log(formData);
    e.preventDefault();
    if (!addressTo || !amount || !message) {
      return;
    }
    sendTransaction();
  }

  return (
    <>
    {currentAccount ? 
      <StyledDiv>
        <Toolbar />
        <StyledForm>
          <Typography variant="body1">
            Make payment to:
          </Typography>
          <StyledTextField
            label="Address To"
            variant="filled"
            size="small"
            type="text"
            name="addressTo"
            onChange={(e) => handlechange(e)}
          />
          <StyledTextField
            label="Amount (ETH)"
            variant="filled"
            size="small"
            type="number"
            name="amount"
            onChange={(e) => handlechange(e)}
          />
          <StyledTextField
            label="Message"
            variant="filled"
            size="small"
            type="text"
            name="message"
            onChange={(e) => handlechange(e)}
          />
          <ContainedButton
            variant="contained"
            onClick={handleSubmit}
            style={{width: '100%'}}
          >
            {isLoading ? <CircularProgress size={26} color="inherit" /> :  'Send'}
          </ContainedButton>
        </StyledForm>
      </StyledDiv>:
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
    <PaymentDialog 
      onClose={handleCloseDialog}
      open={openDialog}
      isLoading={isLoading}
    />
    </>
  )
}

export default MakePayment

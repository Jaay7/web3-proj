import React from 'react'
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Button, Icon, IconButton } from '@mui/material';

const StyledDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  marginTop: '4rem',
  padding: '20px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
  justifyContent: 'space-around',
  [theme.breakpoints.up('sm')]: {
    padding: '20px 80px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '20px 160px',
    flexDirection: 'row',
  }
}));

const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
  backdropFilter: 'blur(10px)',
  backgroundColor: '#ffffff0d',
  borderRadius: '0.5rem',
  padding: '1rem',
  boxShadow: '0px 0px 10px #00000060',
  width: 400,
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  }
}));

const Services = () => {
  return (
    <StyledDiv>
      <Typography variant="h4" style={{width: '20rem'}}>
        Services that we continue to improve
      </Typography>
      <div>
        <StyledCard>
          <IconButton
            style={{
            backgroundColor: '#42ba96',
            color: 'white',
            marginRight: '1rem',
            }}
            disableRipple
          >
            <Icon baseClassName="material-icons-round">gpp_good</Icon>
          </IconButton>
          <div>
            <Typography variant="h6">Security Guaranteed</Typography>
            <Typography variant="subtitle2" color="#e2e2e2">Security is guaranteed. We always maintain privacy and maintaining the good quality of our products.</Typography>
          </div>
        </StyledCard>
        <StyledCard>
          <IconButton
            style={{
            backgroundColor: '#7952a0',
            color: 'white',
            marginRight: '1rem',
            }}
            disableRipple
          >
            <Icon baseClassName="material-icons-round">search</Icon>
          </IconButton>
          <div>
            <Typography variant="h6">Best Exchage Rates</Typography>
            <Typography variant="subtitle2" color="#e2e2e2">You can always trust us. We are always looking for the best exchange rates.</Typography>
          </div>
        </StyledCard>
        <StyledCard>
          <IconButton
            style={{
            backgroundColor: '#e83636',
            color: 'white',
            marginRight: '1rem',
            }}
            disableRipple
          >
            <Icon baseClassName="material-icons-round">favorite</Icon>
          </IconButton>
          <div>
            <Typography variant="h6">Fastest Transactions</Typography>
            <Typography variant="subtitle2" color="#e2e2e2">You can send and receive money in the shortest time possible.</Typography>
          </div>
        </StyledCard>
      </div>
    </StyledDiv>
  )
}

export default Services
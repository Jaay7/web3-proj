import React from 'react'
import { TextField, Typography, Button, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate, Link, Navigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { useMutation, gql } from '@apollo/client';

const login_user = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
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
  padding: '6px 30px',
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  border: '2px solid #293934',
  borderRadius: '50px',
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

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const [ login, {data, loading, error}] = useMutation(login_user, {
    variables: {
      email,
      password
    }
  });

  if(localStorage.getItem('token') && localStorage.getItem('wallet') === 'connected') {
    return <Navigate to="/home" />
  }

  return (
    <>
    <div className={classes.container}>
      <div className={classes.form}>
        { error && <Typography color="red">Oops! Something went wrong.</Typography> }
        <Typography variant="h6">Login</Typography>
        <StyledTextField 
          label="Email"
          type="email" 
          margin="normal" 
          size='small'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField 
          label="Password" 
          margin="normal" 
          size='small'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/login" className={classes.links} style={{alignSelf: 'flex-end'}}>Forgot Password?</Link>
        <ContainedButton
          onClick={() => {
            login();
            if(data) {
              localStorage.setItem('token', data.login.token);
              if(localStorage.getItem('wallet') === 'connected') {
                navigate('/home');
              }
              navigate('/connect-wallet');
            }
          }}
        >{loading ? <CircularProgress size={28} color="inherit" /> : "Login"}</ContainedButton>
        <Typography style={{marginTop: 10}}>Don't have an account? <Link to="/signup" className={classes.links}>Signup</Link></Typography>
      </div>
    </div>
    </>
  )
}

export default Login
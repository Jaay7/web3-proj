import React from 'react'
import { CircularProgress, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const create_user = gql`
  mutation CreateUser($username: String!, $email: String!, $fullName: String!, $password: String!, $phoneNumber: String!) {
    createUser(username: $username, email: $email, fullName: $fullName, password: $password, phoneNumber: $phoneNumber) {
      message
      token
      refreshToken
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
});

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

const ContainedButton = styled((props) => <Button {...props}  />)(({ theme }) => ({
  marginTop: '10px',
  padding: '6px 30px',
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  outline: 'none',
  border: '2px solid #293934',
  borderRadius: '50px',
  backgroundColor: '#293934',
  textTransform: 'capitalize',
  color: '#f2f2f2',
  transition: 'all 0.3s ease-in-out',
  fontWeight: 500,
  '&:hover': {
    color: '#293934da',
    backgroundColor: 'transparent',
    border: '2px solid #293934',
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const [createUser, { data, loading, error }] = useMutation(create_user, {
    variables: {
      username,
      email,
      fullName,
      password,
      phoneNumber
    }
  });
  
  if(localStorage.getItem('token')) {
    return <Navigate to="/home" />
  }
  return (
    <div className={classes.container}>
      <div className={classes.form}>
        { error && <Typography color="red">Oops! Something went wrong. {error.message}</Typography> }
        <Typography variant="h6">Signup</Typography>
        <StyledTextField 
          label="Username" 
          margin="normal" 
          size='small'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField 
          label="Email" 
          margin="normal" 
          size='small'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField 
          label="Full Name" 
          margin="normal" 
          size='small'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <StyledTextField 
          label="Password" 
          margin="normal" 
          size='small'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledTextField
          label="Phone Number"
          margin="normal"
          size='small'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <ContainedButton
          onClick={() => {
            createUser();
            if(data) {
              localStorage.setItem('token', data.createUser.token);
              localStorage.setItem('wallet', 'not connected');
              navigate('/connect-wallet');
            }
          }}
        >{loading ? <CircularProgress size={28} color="inherit" /> : 'Signup'}</ContainedButton>
        <Typography style={{marginTop: 10}}>Already have an account? <Link to="/login" className={classes.links}>Login</Link></Typography>
      </div>
    </div>
  )
}

export default SignUp
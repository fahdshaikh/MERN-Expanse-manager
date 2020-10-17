import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { AppContext } from './ContextAPI/AppContextProvider';
import ExpenseManager from './ExpenseManager'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
    height:"55vh"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  background:{
    backgroundImage:"url('ss.jpeg')",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  foreground:{
      backgroundImage:"url('d.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      color:"white",
      padding:40
  },
  bottom:{
    marginBottom: theme.spacing(10),
  },
  introDiv:{
    textAlign:"left",
    fontSize:20,
    lineHeight:1
  }
}));

export default function SignIn() {
  const classes = useStyles();

  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  const history = useHistory()
  const {setUserId} = useContext(AppContext)
  let [errMsg,setErrMsg] = useState('')
  
  const handleSubmit  = ()=>{
     axios.post("http://localhost:5000/api/user/login",{email:email,password:password})
     .then(res=>{
        setUserId(res.data._id)
     })
     .then(res=> history.push('/ExpenseManager'))
     .catch(err=>{setErrMsg(err.response.data)})
  }

  return (
    <Box component={Grid} container  className={classes.background} spacing={0} direction="column" justify="center" style={{ minHeight: '100vh' }}>
      
    <Box component={Grid} container >
      <Box component={Grid}  container item lg={2}>
    </Box>

      <Box component={Grid} boxShadow={20} container item className={classes.foreground} xs={4}>
        
          <div className={classes.introDiv}>
            <h1 style={{fontSize:70,fontWeight:"bold"}}>WELCOME</h1>
            <h1>ONE</h1>
            <h1>STOP TO</h1>
            <h1>MANAGE ALL YOUR</h1>
            <h1 style={{color:"#FF5722"}}> EXPENSES.</h1>
          </div>
        
      </Box>

      <Box component={Grid}  boxShadow={20} container item style={{backgroundColor:"whitesmoke"}} lg={4}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value = {email}
            onChange ={(e)=>setEmail(e.target.value)}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value ={password}
            onChange ={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
            />
          {errMsg!==""?<h3 style={{color:"red",lineHeight:0}}>{errMsg}</h3>:null}
          <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick ={()=>handleSubmit()}
          className={classes.submit}
          >
          Sign In
          </Button>         

          <Box component={Grid} container className={classes.bottom}>
            <Box component={Grid} item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </form>
      </div>
    </Container>
      </Box>
    </Box>
   
    </Box>
  );
}
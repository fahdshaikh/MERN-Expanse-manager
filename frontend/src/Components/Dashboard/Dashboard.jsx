import React, { useContext, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../ContextAPI/AppContextProvider'

import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Icon from "@material-ui/core/Icon";
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardIcon from "./Card/CardIcon.js";
import CardBody from "./Card/CardBody.js";
import CardFooter from "./Card/CardFooter.js";
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import TextField from '@material-ui/core/TextField';
import Button from './Button/button';
// import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';


import styles from "./dashboardStyle";
import {
  successColor,
  dangerColor,
  infoColor,
} from "./material-dashboard-react";

const useStyles = makeStyles(styles);

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.primary.main,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Dashboard() {
  // const userIdContext = useContext(AppContext)
  let {userId} = useContext(AppContext)
  const classes = useStyles();
  let [totalCredit, setTotalCredit] = useState(0)
  let [totalDebit, setTotalDebit] = useState(0)
  let [balance, setBalance] = useState(0)
  let [transaction, setTransaction] = useState([])
  let [title, setTitle] = useState("")
  let [amt, setAmt] = useState(0)
  // const newTransaction

  // Checkbox
  const [type, setType] = useState({
    credit: true,
    debit: false,
  });

  const handleType = (event) => {
    setType({ ...type, [event.target.name]: event.target.checked });
    console.log(type)
  };

  const { credit, debit } = type;
  const error = [credit, debit].filter((v) => v).length !== 1;

  // new transaction submit 
  const handleSubmit = () => {
    setTransaction()
    console.log(userId,title,amt,type)
  }

  useEffect(() => {
    setTransaction( {
      userId,
      title,
      amt,
      type
    })
  },[transaction])
  
  
  useEffect(() => {
    setBalance(totalCredit-totalDebit)    
  },[balance])
  
  return (
    <div >
      {/* // Credit Debit Balance */}
      <h1>{userId}</h1>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={{borderRight: `5px solid ${successColor[1]}`}}>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
              <Icon>local_atm</Icon>
              </CardIcon>
              <p className={classes.cardCategory} style={{color: `${successColor[1]}`}} >Credit</p>
              <h3 className={classes.cardTitle}>{`₹ ${totalCredit}`}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <ReceiptRoundedIcon  style={{ color: successColor[1] }}/>
                Last Transaction:
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={{borderRight: `5px solid ${dangerColor[1]}`}}>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
              <Icon>local_atm</Icon>
              </CardIcon>
              <p className={classes.cardCategory} style={{color: `${dangerColor[1]}`}}> Debit</p>
              <h3 className={classes.cardTitle}>{`₹ ${totalDebit}`}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <ReceiptRoundedIcon  style={{ color: dangerColor[1] }}/>
                Last Transaction:
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={{borderRight: `5px solid ${infoColor[1]}`}}>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>account_balance</Icon>
              </CardIcon>
              <p className={classes.cardCategory} style={{color: `${infoColor[1]}`}}>Balance</p>
              {(balance < 0)?
               (<h3 className={classes.cardTitle} style={{color: `${dangerColor[1]}`}}>{`₹ ${Math.abs(balance)}`}</h3>)
               :(balance === 0)?(<h3 className={classes.cardTitle} >{`₹ ${balance}`}</h3>)
               :(<h3 className={classes.cardTitle} style={{color: `${successColor[1]}`}}>{`₹ ${balance}`}</h3>)
              }
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <ReceiptRoundedIcon  style={{ color: infoColor[1] }}/>
                Credit - Debit: {(balance < 0)?
                  (`You are in Deficit of ₹ ${Math.abs(balance)}`):(balance === 0)?(`You don't have any Money`):(`You are in Surplus of ₹ ${balance}`)
                }
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
     
      {/* // Last 5 Transactions */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}></GridItem>
        <GridItem  xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info" style={{textAlign: 'left'}}>
              <p className={classes.cardTitleWhite}>Last 5 Transactions</p>
              <p className={classes.cardCategoryWhite}>
                Details about latest 5 transactions
              </p>
            </CardHeader>
            <CardBody>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">S.No</StyledTableCell>
                      <StyledTableCell align="center">Title</StyledTableCell>
                      <StyledTableCell align="center">Type</StyledTableCell>
                      <StyledTableCell align="center">Amount</StyledTableCell>
                      <StyledTableCell align="center">Time</StyledTableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* // New Transactions */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}></GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning" style={{textAlign: 'left'}}>
              <p className={classes.cardTitleWhite}>New Transaction</p>
              <p className={classes.cardCategoryWhite}>
                Add a new Transaction
              </p>
            </CardHeader>
            <form className={classes.form} noValidate>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    value = {title}
                    onChange ={(e)=>setTitle(e.target.value)}
                    />
                    
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    type="number"
                    InputProps={{
                      inputProps: { 
                          max: 100, min: 10 
                      }
                    }}
                    required
                    fullWidth
                    name="amt"
                    label="Ammount"
                    type="amt"
                    id="amt"
                    value ={amt}
                    onChange ={(e)=>setAmt(e.target.value)}
                    autoComplete="current-amt"
                    />
                    
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{lineHeight: '0', marginTop: "10px"}}>
                    <FormControl required error={error} component="fieldset" className={classes.formControl}>
                      {/* <FormLabel component="legend">Pick two</FormLabel> */}
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={credit} onChange={handleType} color="primary" name="credit" />}
                          label="Credit"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={debit} onChange={handleType} name="debit" />}
                          label="Debit"
                        />
                      </FormGroup>
                      <FormHelperText>Pick one*</FormHelperText>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                type="button"
                large
                variant="contained"
                color="warning"
                onClick ={()=>handleSubmit()}
                >
                Add
                </Button>         
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
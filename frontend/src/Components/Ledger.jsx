import React, { useContext, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AppContext } from './ContextAPI/AppContextProvider'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

function Ledger(){
    const classes = useStyles();
    let {userId} = useContext(AppContext)
    let [data,setData] = useState([])
    let [page,setPage] = useState(1)
    let [limit,setLimit] = useState(20)
    let [type,setType] = useState("All")
    let [total,setTotal] = useState(0)

    useEffect(()=>{
        let url  = 'http://localhost:5000/api/transaction/get'
         if(type==="Credit"){
            url = 'http://localhost:5000/api/transaction/get/credit'
        }
        else if(type==="Debit"){
            url = 'http://localhost:5000/api/transaction/get/debit'
        }

        axios.get(url,{params:{"user_id":userId,"page":page,"limit":limit}})
        .then(res=>{
            setData(res.data.current)
            setTotal(res.data.total)
            console.log(res.data)    
            console.log(typeof(userId))    
            console.log(userId)    
            console.log(data)    
        }
            )
        .catch(err=>console.log(err))
    },[page,limit,type])

    const handleChange = async(type)=>{
        await setPage(1)
       setType(type)
    }

    return (        
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" className={classes.title}>
                Ledger
                </Typography>
                <Grid container justify = "center" spacing={2}>
                <Button item color="inherit"onClick={()=>handleChange("All")}>All</Button>
                <Button item color="inherit"onClick={()=>handleChange("Credit")}>Credit</Button>
                <Button item color="inherit"onClick={()=>handleChange("Debit")}>Debit</Button>
                </Grid>
            </Toolbar>
        </AppBar>
         <br></br>       
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
        <TableBody>
          { data.map((item,i) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell component="th" align="center">
                {((page-1)*limit)+(i+1)}
              </StyledTableCell>
              <StyledTableCell align="center">{item.title}</StyledTableCell>
              <StyledTableCell style = {item.type!=="Credit"?{color:"red"}:{color:"green"}} align="center">{item.type}</StyledTableCell>
              <StyledTableCell style = {item.type!=="Credit"?{color:"red"}:{color:"green"}} align="center">{item.type==="Credit"?`+ ${item.amount}`:`- ${item.amount}`}</StyledTableCell>
              <StyledTableCell align="center">{item.timestamp}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
        {
            <Grid container justify = "center">
                <Pagination count={Math.ceil(total/limit)} color="primary" onChange={(e,value)=>setPage(value)} />
          </Grid>
        }
        <br></br>
    </>
)}
export default Ledger;

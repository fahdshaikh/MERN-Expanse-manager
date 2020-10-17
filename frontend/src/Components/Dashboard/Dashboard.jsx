import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from '../ContextAPI/AppContextProvider'

import Icon from "@material-ui/core/Icon";
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import Table from "./Table/Table.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardIcon from "./Card/CardIcon.js";
import CardBody from "./Card/CardBody.js";
import CardFooter from "./Card/CardFooter.js";
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import TextField from '@material-ui/core/TextField';
import Button from './Button/button';
import Checkbox from '@material-ui/core/Checkbox';

import styles from "./dashboardStyle";
import {
  successColor,
  dangerColor,
  infoColor,
} from "./material-dashboard-react";

const useStyles = makeStyles(styles);


export default function Dashboard() {
  const userIdContext = useContext(AppContext)
  const classes = useStyles();
  return (
    <div >
      {/* // Credit Debit Balance */}
      <h1>{userIdContext.userId}</h1>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card style={{borderRight: `5px solid ${successColor[1]}`}}>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
              <Icon>local_atm</Icon>
              </CardIcon>
              <p className={classes.cardCategory} style={{color: `${successColor[1]}`}} >Credit</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <ReceiptRoundedIcon  style={{ color: successColor[1] }}/>
                Last Transaction
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
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <ReceiptRoundedIcon  style={{ color: dangerColor[1] }}/>
                Last Transaction
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
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <ReceiptRoundedIcon  style={{ color: infoColor[1] }}/>
                Credit - Debit
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
            <CardHeader color="info">
              <p className={classes.cardTitleWhite}>Last 5 Transactions</p>
              <p className={classes.cardCategoryWhite}>
                Details about latest 5 transactions
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={["ID", "Name", "Salary", "Type"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Credit"],
                  ["2", "Minerva Hooper", "$23,789", "Debit"],
                  ["3", "Sage Rodriguez", "$56,142", "Credit"],
                  ["4", "Philip Chaney", "$38,735", "Debit"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* // New Transactions */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}></GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
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
                    label="title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    // value = {title}
                    // onChange ={(e)=>setTitle(e.target.value)}
                    />
                    
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="amt"
                    label="amt"
                    type="amt"
                    id="amt"
                    // value ={amt}
                    // onChange ={(e)=>setamt(e.target.value)}
                    autoComplete="current-amt"
                    />
                    
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{lineHeight: '0', marginTop: "10px"}}>
                  <p style={{fontSize: "14px"}}>Credit:
                    <Checkbox 
                        // checked={checked}
                        // onChange={handleChange}
                        // defaultChecked
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> 
                    Debit:
                    <Checkbox 
                      color="primary"
                      // inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /></p>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                type="button"
                // fullWidth
                large
                variant="contained"
                color="warning"
                // onClick ={()=>handleSubmit()}
                // className={classes.submit}
                >
                Sign In
                </Button>         
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
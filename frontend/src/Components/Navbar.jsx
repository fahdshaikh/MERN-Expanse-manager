import {
    AppBar,
    IconButton,
    Toolbar,
    Button,
    Typography,
    Drawer,
    CssBaseline,
    Avatar,
    Divider,
    ListItem,
    ListItemText,
    ListItemIcon
  } from "@material-ui/core";
  import clsx from "clsx";
  import React from "react";
  import MenuIcon from "@material-ui/icons/Menu";
  import { makeStyles } from "@material-ui/core/styles";
  import DashboardIcon from "@material-ui/icons/Dashboard";
  import AssignmentIcon from "@material-ui/icons/Assignment";
  import { useHistory } from "react-router-dom";
  const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex"
    },
    navTitle: {
      padding: 10
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(5, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "center"
    },
    hide: {
      display: "none"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flex: 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  }));
  
  function Navbar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const handleDrawerToggle = () => {
      setOpen(!open);
    };
  
    const handleRouteChange = (to) => {
      history.push(to);
    };
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                MERN Expense Manager 
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <Avatar ><img src="../../public/logo192.png" /></Avatar> 
            <Typography variant="h6"> MERN Expense Manager </Typography>
            <Typography variant="subtitle1">-- Alok Kothiyal</Typography>
            <Typography variant="subtitle1">-- Fahad Shaikh </Typography>
          </div>
          <Divider />
          {[
            {
              icon: <DashboardIcon />,
              text: "Dashboard",
              to: "/ExpenseManager"
            },
            {
              icon: <AssignmentIcon />,
              text: "Ledger",
              to: "/ExpenseManager/ledger"
            }
          ].map((item, index) => (
            <ListItem
              button
              onClick={() => handleRouteChange(item.to)}
              key={item.text}
            >
              <ListItemIcon> {item.icon} </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {props.children}
        </main>
      </div>
    );
  }
  
  export { Navbar };
  
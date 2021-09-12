import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DataContext from '../store/data-context';
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:'100%',
    minWidth:'200px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar=()=> {
  const dataCtx= useContext(DataContext)
  const classes = useStyles();

  const logoutHandler = ()=>{
      dataCtx.onLogout()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="secondary"  aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            PostApp
          </Typography>
          {!dataCtx.isLoggedin && <Button href='/' >Login</Button>}
          {dataCtx.isLoggedin && <Button onClick={logoutHandler} >Logout</Button>}

          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar

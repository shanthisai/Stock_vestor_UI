import {
  withStyles,
} from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = (theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  link: {
    textDecoration: "none",
  },
  listitem : {
    color: "#5CDB95", 
    padding : "42px",
  },
  list : {
    backgroundColor: "#05386B",
  },
  listitemaccordion: {
    alignContent: "center"
  },
  listitemtextaccordion : {
    color : "#5CDB95",
  },
  expandless : {
    color : "#5CDB95",
    // color: "#EDF5E1",
  },
  expandmore : {
    color : "#5CDB95",
    // color: "#EDF5E1",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  collapselist: {
    backgroundColor: "#5CDB95",
    color: "#05386B",
  },
  collapselistitemtextaccordion : {
    color: "#05386B",
    
    // color: "#EDF5E1",
  }

});

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false
    };
  }
  componentDidMount = () => {
    console.log("Sidebar");
  };

  handleClick = () => {
    if (this.state.open) {
      this.setState({ open : false});
    } else {
      this.setState({ open : true});
    }
  };

  handleClick1 = () => {
    if (this.state.open1) {
      this.setState({ open1 : false});
    } else {
      this.setState({ open1 : true});
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <List className = {classes.list}>
          <ListItem button onClick={this.handleClick} className = {classes.listitemaccordion}>
            <ListItemText primary="TOP10"  className = {classes.listitemtextaccordion}/>
            {this.state.open ? <ExpandLess className = {classes.expandless}/> : <ExpandMore className = {classes.expandmore}/>}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className = {classes.collapselist}>
              <NavLink
                  to={{ pathname: "/top/10/buy" }}
                  className={classes.link}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="BUY" className = {classes.collapselistitemtextaccordion}/>
                  </ListItem>
                </NavLink>
                <NavLink
                  to={{ pathname: "/top/10/sell" }}
                  className={classes.link}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="SELL" className = {classes.collapselistitemtextaccordion}/>
                  </ListItem>
                </NavLink>
            </List>
          </Collapse>
          <ListItem button onClick={this.handleClick1} className = {classes.listitemaccordion}>
            <ListItemText primary="TOP30" className = {classes.listitemtextaccordion}/>
            {this.state.open1 ? <ExpandLess className = {classes.expandless}/> : <ExpandMore className = {classes.expandmore}/>}
          </ListItem>
          <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className = {classes.collapselist}>
              <NavLink
                  to={{ pathname: "/top/30/buy" }}
                  className={classes.link}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="BUY" className = {classes.collapselistitemtextaccordion}/>
                  </ListItem>
                </NavLink>
                <NavLink
                  to={{ pathname: "/top/30/sell" }}
                  className={classes.link}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemText primary="SELL" className = {classes.collapselistitemtextaccordion}/>
                  </ListItem>
                </NavLink>
            </List>
          </Collapse>
        </List>
        <List className = {classes.list} >
          <NavLink to={{ pathname: "/sectors" }} className={classes.link}>
            <ListItem button key= "SECTORS">
                <ListItemText primary="SECTORS" className = { classes.listitem }/>
              </ListItem>
          </NavLink>
          <NavLink to={{ pathname: "/sp500" }} className={classes.link}>
            <ListItem button key= "SP500">
                <ListItemText primary="NASDAQ 100" className = { classes.listitem }/>
              </ListItem>
          </NavLink>
          <NavLink to={{ pathname: "/revenue" }} className={classes.link}>
            <ListItem button key= "REVENUE">
                <ListItemText primary="TOP 30 REVENUE" className = { classes.listitem }/>
              </ListItem>
          </NavLink> 
        </List>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SideBar);

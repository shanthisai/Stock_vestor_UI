import React from "react";
import {
  TextField,
  Typography,
  Tooltip,
  withStyles,
  Grid,
  Avatar,
  Paper,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import { withRouter } from "react-router-dom";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const styles = (theme) => ({
  paper : {
    fontSize: 46,
    fontStyle: "Italic",
    color : "#05386B",
    alignContent: "center",
    alignItems: 'center',
  },
  large: {
    width: 200,
    height: 200,
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#05386B !important",
  },
  tooltip: {
    backgroundColor: "inherit",
    color: "#ff0000",
    maxWidth: "none",
  },
});

class Mainbse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyNames: JSON.parse(localStorage.getItem("companyNamesbse")) || [],
      selectedCompany : "",
    };
  }
  componentDidMount = () => {
    console.log("Main");
    const companyNames = JSON.parse(localStorage.getItem("companyNamesbse"));
    if (companyNames != null) {
      return;
    }
    this.getCompanyNames();
  };

  getCompanyNames = () => {
    axios
      .get("/api/companyNamesbse")
      .then((s) => {
        if (s.status === 200) {
          this.setState({ companyNames: s.data }, () => {
            localStorage.setItem(
              "companyNames",
              JSON.stringify(this.state.companyNames)
            );
          });
        } else {
          this.setState({ companyNames: [] });
        }
      })
      .catch((e) => console.log(e));
  };

  selectedCompany = (e, val) => {
    const { history } = this.props;
    if (val === null) {
      history.push("/");
      return;
    }
    this.setState({ selectedCompany: val }, () => {
      history.push("/companydetailsbse/" + this.state.selectedCompany);
    });
  };


  render() {
    const { classes } = this.props;
    const logged = JSON.parse(localStorage.getItem("logged"));
    
    return (
      <React.Fragment>
        <div>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item container justify="center" alignItems="center">
              <Grid item>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "cursive",
                    fontSize: 50,
                  }}
                >
                  Stock Vestor
                </Typography>
              </Grid>
              <Grid item>
                <TrendingUpIcon style={{ fontSize: 80 }} />
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Stock analysis tool for investors in India.
              </Typography>
            </Grid>
            <Grid item>
              {/* <Tooltip
                title={
                  logged == null || logged == false ? (
                    <Typography variant="h5">sign in to access</Typography>
                  ) : (
                    <span />
                  )
                }
                classes={{ tooltip: classes.tooltip }}
              > */}
                <Autocomplete
                  // disabled={logged != true}
                  style={{
                    width: 400,
                  }}
                  id="search for companies"
                  freeSolo
                  onChange={(e, val) => {
                    this.selectedCompany(e, val);
                  }}
                  options={this.state.companyNames.map(
                    (companyname) => companyname
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="search for companies"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        style: { color: "black" },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        classes: {
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                    />
                  )}
                />
              {/* </Tooltip> */}
            </Grid>
            <Grid item justify = "center" style = {{ padding : "30px"}}>
              <Paper elevation = {0} className = {classes.paper}>
                "Know what you own, and know why you own it."
              </Paper>
            </Grid>
            <Grid item>
              <img
                src="\images\stocks6.png"
                style={{
                  position: "relative",
                  top: 35,
                  left: 0,
                  width: "100%",
                  height: "90%",
                }}
              />
            </Grid>
            
          </Grid>
        </div>
        {/* <div style = {{ width : "80px", height : "80px"}}></div> */}
        
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Mainbse));
import {
  Chip,
  Grid,
  Paper,
  Typography,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Button,
} from "@material-ui/core";
import React from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Loader from "react-loader-spinner";



const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    Width: 10, 
  },
  tableCell : {
    color: "#05386B",
    fontWeight : 'bold',
  },
  suggestionTable: {
    width: 20,
  },
  suggestionTableCell : {
    color: "#05386B",
    fontWeight : 'bold',
    align: "center", 
  },
  tooltip: {
    backgroundColor: "white",
    maxWidth : "none",
    color : "#05386B",
  },
  tooltip1: {
    backgroundColor: "#379683",
    maxWidth: "none",
    color : "#EDF5E1",
  },
});

class CompanyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
      companyCurrentDayStockDetails: [],
      selectedCompany: "",
      companyDetailsLoading: true,
      stockDetailsLoading: true,
      suggestionLoading: true,
      impStockkeys: [
        "Date",
        "Open",
        "High",
        "Low",
        "Close",
      ],
      otherStockkeys: [
        // "WAP",
        // "No.of Shares",
        // "No. of Trades",
        // "Total Turnover (Rs.)",
        // "% Deli. Qty to Traded Qty",
        "Spread High-Low",
        "Spread Close-Open",
      ],
      stockdetails: [],
      suggestion: [],
    };
  }

  componentDidMount = () => {
    console.log("CompanyDetails");
    const { match } = this.props;
    const company = match.params.company;
    this.setState({ selectedCompany: company }, () => {
      this.getDetails(this.state.selectedCompany);
    });
  };


  getDetails = async(company) => {
    this.getCompanyDetails(company);
    this.getStockDetails(company);
    this.getSuggestion(company);
  }

  getCompanyDetails = async (company) => {
    await axios.get("/api/companydetails?company=" + company).then((s) => {
      if (s.status === 200) {
        let companyDetails = s.data;
        const x=companyDetails["Market Cap"]
        if(Math.abs(Number(x)) >= 1.0e+9){
          companyDetails["Market Cap"]=(Math.abs(Number(x)) / 1.0e+9).toFixed(2) + " Billion USD"
        }
        else if(Math.abs(Number(x)) >= 1.0e+6){
          (Math.abs(Number(x)) / 1.0e+6).toFixed(2) + "Million USD"
        }
        else if(Math.abs(Number(x)) >= 1.0e+3){
          (Math.abs(Number(x)) / 1.0e+3).toFixed(2) + "K USD"
        }
        this.setState({ companyDetails: companyDetails, companyDetailsLoading: false }, () => {});
      } else {
        this.setState({ companyDetails: [], companyDetailsLoading: false }, () => {});
      }
    })
    .catch((e) => {
      console.log(e);
      this.setState({ companyDetails: [], companyDetailsLoading: false }, () => {});
    });
  };


  getStockDetails = async(company) => {
    await axios
      .get("/api/previousdaystockdetails?company=" + company)
      .then((s) => {
        if (s.status === 200) {
          this.setState({ stockdetails: s.data, stockDetailsLoading: false }, () => {});
        } else {
          this.setState({ stockdetails: [], stockDetailsLoading: false }, () => {});
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ stockdetails: [], stockDetailsLoading: false }, () => {});
      });
  };

  getSuggestion = async(company) => {
    await axios
        .get("/api/getsuggestions?company=" + company)
        .then((t) => {
          if (t.status === 200) {
            this.setState({ suggestion: t.data, suggestionLoading: false }, () => {});
          } else {
            this.setState({ suggestion: "", suggestionLoading: false }, () => {});
          }
        })
        .catch((e) => {
          console.log(e);
          this.setState({ suggestion: "", suggestionLoading: false }, () => {});
        });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.state.selectedCompany !== "" && (
          <div>
            <Paper
              elevation={0}
              style={{
                display: "flex",
                padding: "15px",
                margin: "15px",
                justifyContent: "center",
                backgroundColor: "#05386B",
                color : "#5CDB95"
              }}
            >
              <Typography variant="subtitle1" >{this.state.selectedCompany}</Typography>
            </Paper>
            <div style = {{ padding : "30px"}}></div>
            <Grid 
              container
              spacing={3}
              justify="center"
              alignItems="center"
            >
            {this.state.companyDetailsLoading === true ? (
              <Loader type="ThreeDots" color="#05386B" height={80} width={80}/>
            ) : (
                <Grid item xs = {4}>
                  <Paper>
                    {Object.keys(this.state.companyDetails).map((key) => {
                      if (this.state.companyDetails[key] === null) {
                        return <span></span>;
                      }
                      if (key === "suggest") {
                        return <span></span>;
                      } else {
                        return (
                            <TableContainer component={Paper}>
                              <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow key={key}>
                                      <TableCell className = { classes.tableCell } component="th" scope="row">
                                        {key}
                                      </TableCell>
                                      <TableCell className = { classes.tableCell } align="right">{this.state.companyDetails[key]}</TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                        ); 
                      }
                    
                    })}
                  </Paper>
                </Grid>
                )}
                {this.state.suggestionLoading === true ? (
                  <Loader type="ThreeDots" color="#05386B" height={80} width={80}/>
                ) : (
                <Grid item xs = { 2.5 }>
                    <TableContainer component={Paper} style = {{ width : 127}}>
                      <Table className={classes.suggestionTable} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell 
                              style={{
                                background: "#05386B",
                                color : "#5CDB95",
                              }}
                              >SUGGESTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.suggestion['suggest'] == "buy" ? (
                            <Tooltip
                              classes={{ tooltip: classes.tooltip }}
                              placement="top"
                              title={
                                <Typography>
                                  Its actual returns percentage <br/>is closer to the predicted Lower Band %.<br/>
                                  Lower Band % - {this.state.suggestion['lower']}<br/>
                                  Actual Returns % - {this.state.suggestion['actual']}<br/>
                                  Upper Band %- {this.state.suggestion['upper']}
                                </Typography>
                              }
                              interactive
                            >
                             <TableRow>
                                <TableCell  
                                  className = { classes.suggestionTableCell } 
                                  style={{
                                    background: "#379683",
                                    color : "#EDF5E1",
                                  }}
                                  >
                                  BUY
                                </TableCell>
                              </TableRow>
                            </Tooltip>
                          ) : (
                            <TableRow>
                                <TableCell  
                                  className = { classes.suggestionTableCell } 
                                  style={{
                                    background: "white",
                                    color : "#05386B",
                                  }}
                                  >
                                  BUY
                                </TableCell>
                              </TableRow>
                          )}
                          {this.state.suggestion['suggest'] == "sell" ? (
                            <Tooltip
                              classes={{ tooltip: classes.tooltip }}
                              placement="right-end"
                              title={
                                <Typography>
                                  Its actual returns percentage <br/>is closer to the predicted Upper Band %.<br/>
                                  Lower Band %- {this.state.suggestion['lower']}<br/>
                                  Actual Returns % - {this.state.suggestion['actual']}<br/>
                                  Upper band %- {this.state.suggestion['upper']}
                                  </Typography>
                              }
                              interactive
                            >
                             <TableRow>
                                <TableCell  
                                  className = { classes.suggestionTableCell } 
                                  style={{
                                    background: "#379683",
                                    color : "#EDF5E1",
                                  }}
                                  >
                                  SELL
                                </TableCell>
                              </TableRow>
                            </Tooltip>
                          ) : (
                            <TableRow>
                                <TableCell  
                                  className = { classes.suggestionTableCell } 
                                  style={{
                                    background: "white",
                                    color : "#05386B",
                                  }}
                                  >
                                  SELL
                                </TableCell>
                              </TableRow>
                          )}
                          {this.state.suggestion['suggest'] == "hold" ? (
                            <Tooltip
                              classes={{ tooltip: classes.tooltip }}
                              placement="bottom"
                              title={
                                <Typography>
                                  Its actual returns percentage is neither <br/>closer to the predicted Upper Band % <br/> nor to the predicted Lower band %.
                                  </Typography>
                              }
                              interactive
                            >
                             <TableRow>
                                <TableCell  
                                  className = { classes.suggestionTableCell } 
                                  style={{
                                    background: "#379683",
                                    color : "#EDF5E1",
                                  }}
                                  >
                                  HOLD
                                </TableCell>
                              </TableRow>
                            </Tooltip>
                          ) : (
                            <TableRow>
                                <TableCell  
                                  className = { classes.suggestionTableCell } 
                                  style={{
                                    background: "white",
                                    color : "#05386B",
                                  }}
                                  >
                                  HOLD
                                </TableCell>
                              </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Typography variant = "caption"> * Suggestions are given <br />with a buffer of 15%.</Typography>
                </Grid>
                )}

                { this.state.stockDetailsLoading == true ? (
                  <Loader type="ThreeDots" color="#05386B" height={80} width={80}/>
                ) : (
                  <Grid item xs = { 4 }>
                    { this.state.impStockkeys.map((key) => {
                      return (
                          <TableContainer component={Paper}>
                              <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow key={key}>
                                      <TableCell className = { classes.tableCell } component="th" scope="row">
                                        {key}
                                      </TableCell>
                                      <TableCell className = { classes.tableCell } align="right">{this.state.stockdetails[key]}</TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                      );
                      }
                    )}
                    <Tooltip
                      classes={{ tooltip: classes.tooltip1 }}
                      placement="right-end"
                      title={
                        <TableRow>
                          {this.state.otherStockkeys.map((key) => {
                            return (
                              <TableRow>
                                <TableCell>{key}</TableCell>
                                <TableCell align="right">
                                  {this.state.stockdetails[key]}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableRow>
                      }
                      interactive
                    >
                      <Button variant="outlined" size = "small"
                        style = {{
                          backgroundColor: "#05386B",
                          color : "#EDF5E1"
                        }}
                      >
                        MORE DETAILS
                      </Button>
                    </Tooltip>

                  </Grid>
                )}
              </Grid>
          </div>
        )}
        <div style = {{ padding : "30px"}}></div>
        {this.state.selectedCompany !== "" &&
          this.state.stockdetails.length !== 0 && (
            <Dashboard company={this.state.selectedCompany} />
          )}
      </React.Fragment>
    );
  }
}


export default withStyles(styles, { withTheme: true })(CompanyDetails);

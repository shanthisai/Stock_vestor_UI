import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import underscore from "underscore";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme) => ({
  tooltip: {
    backgroundColor: "white",
    color: "#05386B",
    maxWidth: "none"
  }
});


class Simulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: "",
      companyNames: [],
      days: 1,
      investment: 1,
      startdate: "2017-03-10",
      response: [],
      cols: [],
      loading: false,
      seldays: "",
      simulationtop: [],
      companyselectedaftersimulation : "",
      companydetailsaftersimulation : [],
      tooltipopen: false,
    };
  }

  componentDidMount = () => {
    const SP500 =
      // "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/SP500Companies.json";
      "https://raw.githubusercontent.com/shanthisai/Stock_analysis_tool/main/NASDAQ_Data/Companieswithsymbols.json"
    axios
      .get(SP500)
      .then((s) => {
        if (s.status === 200) {
          let SP500Companies = Object.keys(underscore.invert(s.data));
          this.setState({ companyNames: SP500Companies }, () => {});
        }
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("Simulation");
  };

  onClickSubmit = () => {
    if (this.state.selectedCompany === "") {
      return;
    }
    const params =
      "company=" +
      this.state.selectedCompany +
      "&" +
      "investment=" +
      this.state.investment +
      "&" +
      "days=" +
      this.state.days +
      "&" +
      "date=" +
      this.state.startdate;
    this.setState({ loading: true });
    axios
      .get("/api/simulation?" + params)
      .then((s) => {
        if (s.status === 200) {
          let resp = s.data;
          if (resp.length != 0) {
            let cols = [];
            Object.keys(resp[0]).map((key) => {
              cols.push({ field: key, headerName: key, width: 150 });
            });
            let rows = [];
            for (let i = 0; i < resp.length; i++) {
              if (Object.keys(resp[i]).length === 0) {
              } else {
                resp[i]["id"] = i;
                rows.push(resp[i]);
              }
            }
            this.setState(
              { response: rows, cols: cols, loading: false },
              () => {}
            );
          } else {
            this.setState({ loading: false }, () => {});
          }
        } else {
          this.setState({ loading: false }, () => {});
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ loading: false }, () => {});
      });
  };

  onSelectDays = (e) => {
    const days = e.target.value;
    this.setState({ seldays: days }, () => {});
    axios
      .get("/api/simulationtop" + "?" + "days=" + days)
      .then((s) => {
        console.log(s.data);
        if (s.status === 200) {
          this.setState({ simulationtop: s.data }, () => {});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };



  getDataFromURL = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                resolve(data)
            });
    });
    }, 2000);

  

  exportToCSV = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  render() {
    let logged = JSON.parse(localStorage.getItem("logged"));
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid>
          <Typography variant = "subtitle1" style = {{ color : "#05386B"}}>Select number of days for simulation : </Typography>
          <div style = {{
            padding : '3px'
          }}>
          </div>

          {/* <Tooltip
            open={this.state.tooltipopen}
            classes={{ tooltip: classes.tooltip }}
            title={
              <Typography variant="h6" className={classes.primary}>
                sign in to access
              </Typography>
            }
            interactive
          > */}
            <FormControl style={{ minWidth: "150px" }} variant="outlined">
              <InputLabel style = {{ color : "#5CDB95"}}>days</InputLabel>
              <Select
                style={{ 
                  width: "100%",
                  backgroundColor: "#05386B",
                  color: "#5CDB95"
                }}
                labelId="days"
                id="days"
                onChange={(e) => {
                  const val = e.target.value;
                  // if (logged === true) {
                    this.onSelectDays(e);
                  // } 
                  // else {
                  //   this.setState({
                  //     days: val,
                  //     tooltipopen: true
                  //   });
                  // }
                }}
                value={this.state.seldays}
              >
                {[30, 60, 90, 180, 360, 720].map(
                  (period) => {
                    return <MenuItem value={period}>{period}</MenuItem>;
                  }
                )}
              </Select>
            </FormControl>
          {/* </Tooltip> */}

          <div style = {{
            padding : '20px',
          }}></div>

          { this.state.loading ? (
            <Loader type="ThreeDots" color="#05386B" height={80} width={80}/>
          ) : (
              this.state.simulationtop.length != 0 && (
                <TableContainer component={Paper}>
                  <Table className="Simualtion Results" minWidth= "650" aria-label="simple table">
                    <TableHead style = {{ color : "#05386B", backgroundColor: "#5CDB95",}}>
                      <TableRow>
                        <TableCell variant = "h5"> Symbol</TableCell>
                        <TableCell align="right" variant = "h5">Company</TableCell>
                        <TableCell align="right" variant = "h5">Actual Average Returns</TableCell>
                        <TableCell align="right" variant = "h5">Minimum Predicted Returns</TableCell>
                        <TableCell align="right" variant = "h5">Maximum Predicted Returns</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.simulationtop.map((row) => {
                        console.log(row);
                        return (
                        <TableRow key={row.Company}>
                          <TableCell component="th" scope="row">
                            {row.security_id}
                          </TableCell>
                          <TableCell align="right">{row.company}</TableCell>
                          <TableCell align="right">{row.actual_average_return_percent}</TableCell>
                          <TableCell align="right">{row.minimum_prediction_range}</TableCell>
                          <TableCell align="right">{row.maximum_prediction_range}</TableCell>
                        </TableRow>
                      )})}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
          )}
        </Grid>
      </React.Fragment>
    );
  }
}


export default withStyles(styles, { withTheme: true })(Simulation);

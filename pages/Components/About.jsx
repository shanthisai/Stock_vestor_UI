import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";


const styles = (theme) => ({
  root: {
    maxWidth: 250,
  },
  typography: {
    padding: 15,
    color: "#05386B",
  },
  
});

class About extends React.Component {
  componentDidMount = () => {
    console.log("About")
  };

  render() {
    const { classes } = this.props;

    return (
    <React.Fragment>
      <div style = {{ width : '30px', height : '30px'}}></div>
      <div>
        <Typography variant = "h6" className = { classes.typography }>
            Stock Vestor is a tool for stock investors to optimize their returns by predicting the stock price of the given company in midterm investments.
            This tool considers each stock, understands the trend of the stock for short and longer periods, 
            evaluates volatility and risk of the stock, assesses the effect of market sentiment and corporate actions on the stock and advise investors on entry and exit of that stock.
        </Typography>
        <Typography variant = "h6" className = { classes.typography }>
        We are a team of analytics experts who utilize their skills in both technology and social science to find trends and manage data.
        </Typography>
      </div>
      <div>
        <Typography variant = "h6" className = { classes.typography }>
          Our Team :
          <h4>Dr.Arun Kumar Parayatham</h4>
        <h4>Shanthi Sai</h4>
        <h4>Harideep</h4>
        <p>Taken Reference From:</p>
        <h4>Sai Krishna Nama</h4>
        <h4>Venu Gopal Jilla</h4>
        </Typography>
        
      </div>
    </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(About);

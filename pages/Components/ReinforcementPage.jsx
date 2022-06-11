import React, { Component } from 'react';
import axios from "axios";

class ReinforcementPage extends Component {
    constructor(props) {
        super(props);
        this.state = { reinf: [] };
      }
    componentDidMount = () => {
        axios
          .get("/api/reinforcement")
          .then((s) => {
            this.setState({ reinf: s?.data, loading: false }, () => {});

          })
          .then(() => {})
          .catch((e) => {});
      };
    render() {
        return (
            <div>
                <table style={{ border: '1px solid #ddd',borderCollapse: 'collapse',width: '60%'}}>
                      <tr style={{backgroundColor:'#FFD580'}}>
                        <th style={{ border: '1px solid #ddd',padding: '15px'}}>#</th>
                        <th style={{ border: '1px solid #ddd',padding: '15px'}}>sac</th>
                        <th style={{ border: '1px solid #ddd',padding: '15px'}}>td3</th>
                        <th style={{ border: '1px solid #ddd',padding: '15px'}}>ppo</th>
                        <th style={{ border: '1px solid #ddd',padding: '15px'}}>ddpg</th>
                      </tr>
                    {this.state.reinf.slice(1, this.state.reinf.length).map((item, index) => {
                              return (
                                <tr >
                                  <td style={{ border: '1px solid #ddd',padding: '15px'}}>{item[0]}</td>
                                  <td style={{ border: '1px solid #ddd',padding: '15px'}}>{item[1]}</td>
                                  <td style={{ border: '1px solid #ddd',padding: '15px'}}>{item[2]}</td>
                                  <td style={{ border: '1px solid #ddd',padding: '15px'}}>{item[3]}</td>
                                  <td style={{ border: '1px solid #ddd',padding: '15px'}}>{item[4]}</td>
                                </tr>
                              );
                    })} 
                </table>
            </div>
        );
    }
}
export default ReinforcementPage;

const axios = require("axios");
export default async (req, res, next) => {
  try {
    console.log("simulationtop");
    const topurl = 
      // "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/Top/simres_seldays.csv";
      "https://raw.githubusercontent.com/shanthisai/Stock_analysis_tool/af21cf148480479f6ac50143abf070e45eec5cb9/NASDAQ_Data/Top/simres_seldays.csv"

    const days = req.query["days"];
    axios
      .get(topurl.replace("seldays", days))
      .then((s) => {
        if (s.status === 200) {
          let response = [];
          let rows = s.data.split("\n");
          const header = rows[0].split(",");
          for (let i = 1; i < rows.length; i++) { 
            const data = rows[i].split(",");
            if (data.length < 3) {
              continue;
            }
            if ((parseFloat(data[2]) == parseFloat(data[4])) || (parseFloat(data[2]) == parseFloat(data[5]))) {
              continue;
            }
            response.push({
              security_id: data[0],
              company : data[1],
              actual_average_return_percent: data[2],
              minimum_prediction_range : data[4],
              maximum_prediction_range : data[5],
            });
          }
          res.send(response);
        } else {
          res.status(404).send({ error: "error" });
        }
      })
      .catch((e) => {
        res.status(404).send({ error: "error" });
        console.log(e);
      });
  } catch (error) {
    res.status(404).send({ error: "error" });
  }
};

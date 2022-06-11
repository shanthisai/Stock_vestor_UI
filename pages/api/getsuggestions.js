const axios = require("axios");
export default (req, res, next) => {
  try {
    let company = req.query["company"];
    // company = company.toUpperCase();
    const suggestURL =
      // "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/Top/simres_180.csv";
      "https://raw.githubusercontent.com/shanthisai/Stock_analysis_tool/main/NASDAQ_Data/Top/simres_180.csv"
    const companywithidURL =
      // "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/companywithid.json";
      "https://raw.githubusercontent.com/shanthisai/Stock_analysis_tool/main/NASDAQ_Data/Companieswithsymbols.json"

    axios
      .get(companywithidURL)
      .then((s) => {
        if (s.status === 200) {
          const code =s.data[company];

          axios
            .get(suggestURL)
            .then((t) => {
              if (t.status === 200) {
                let suggestion = "";
                let rows = t.data.split("\n");
                const header = rows[0].replace("\r", "").split(",");
                const codeindex = header.indexOf("symbol");
                const suggestindex = header.indexOf("suggest");
                const actualindex = header.indexOf("actual");
                const minimumindex = header.indexOf("minimum");
                const maximumindex = header.indexOf("maximum");
                var row = [];
                for (let i = 1; i < rows.length - 1; i++) {
                  row = rows[i].split(",");
                  if (row[codeindex] == code) {
//                    if ((parseFloat(row[actualindex]) == parseFloat(row[minimumindex])) || (parseFloat(row[actualindex]) == parseFloat(row[maximumindex]))) {
//                      suggestion = "hold";
//                    } else {
                      suggestion = row[suggestindex].replace("\r", "");
                      if (row[suggestindex] == "") {
                        suggestion = "hold";
                      }
//                    }
                    break;
                  }
                }

                res.send({ suggest: suggestion, lower : parseFloat(row[minimumindex]).toFixed(3), upper : parseFloat(row[maximumindex]).toFixed(3), actual : parseFloat(row[actualindex]).toFixed(3) });
              } else {
                res.status(404).send({ error: "error" });
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(404).send({ error: "error" });
            });
        } else {
          res.status(404).send({ error: "error" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send({ error: "error" });
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error" });
  }
};
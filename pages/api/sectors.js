const axios = require("axios");

export default (req, res, next) => {
  try {
    const sectorsURL =
      // "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/sectors.json";
      "https://raw.githubusercontent.com/shanthisai/Stock_analysis_tool/af21cf148480479f6ac50143abf070e45eec5cb9/NASDAQ_Data/Sectors.json"
    axios
      .get(sectorsURL)
      .then((s) => {
        if (s.status === 200) {
          res.send(s.data);
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

const axios = require("axios");

export default async (req, res, next) => {
  try {
    const query = req.query;
    const days = parseInt(query["days"]);
    const rate = parseFloat(query["rate"]) / 100;
    let company = req.query["company"];
    company = company.toUpperCase();
    const companywithidURL =
      // "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/companywithid.json";
      "https://raw.githubusercontent.com/shanthisai/Stock_analysis_tool/main/NASDAQ_Data/Companieswithsymbols.json"
    const grstockdetailsURL =
      // "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011-data/master/Data/GRStock";
      "https://raw.githubusercontent.com/shanthisai/Stock_analysis_tool/af21cf148480479f6ac50143abf070e45eec5cb9/NASDAQ_Data/GRStock"
    axios
      .get(companywithidURL)
      .then((s) => {
        if (s.status === 200) {
          const companywithid = s.data;
          const code = companywithid[company];
          axios
            .get(grstockdetailsURL + "/" + "gr_" + code + ".csv")
            .then((t) => {
              if (t.status === 200) {
                let nums = 0;
                let nums1 = 0;
                let rows = t.data.split("\n");
                const header = rows[0].split(",");
                const cpgr = header.indexOf("Close Price GR");
                const availdays = Math.min(rows.length, days);
                for (let i = 1; i < availdays; i++) {
                  const row = rows[i];
                  const cols = row.split(",");
                  if (cols[cpgr] > rate) {
                    nums = nums + 1;
                  }
                  if (cols[cpgr] < (-1 * rate)) {
                    nums1 = nums1 + 1;
                  }
                }
                const response = {
                  company: company,
                  numberOfDays: nums,
                  percentOfDays: ((nums / days) * 100).toFixed(3),
                  percentOfDays1 : (( nums1 / days) * 100).toFixed(3),
                  totalNumberOfDays: days,
                  rate: rate * 100,
                };
                res.send(response);
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

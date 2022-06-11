const axios = require("axios");

export default async (req, res) => {
  try {
    const pageURL =
      "https://raw.githubusercontent.com/HarideepSriperumbooduru/stock-modelling/main/saved_files/2010-02-17___to___2020-02-17/portfolio_history.csv";
    await axios
      .get(pageURL)
      .then((s) => {
        if (s.status === 200) {
          let list=[]
          const data= s.data.split("\n")
          for (let i = 1; i < data.length-1; i++) {
            const splitData = data[i].split(",");
            list.push(splitData)
          }
          res.send(list);
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

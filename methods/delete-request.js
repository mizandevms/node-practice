const writeToData = require("../utilies/write-to-file");

module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  //   console.log(baseUrl);
  let ID = req.url.split("/")[3];

  //   console.log(ID);

  const regex = new RegExp(/^[1-9]\d*$/);
  if (!regex.test(ID)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({
        title: "Authentication Error",
        message: "Not a valid Positive integer",
      })
    );
    res.end();
  } else if (regex.test(ID)) {
    if (baseUrl == "/api/videos/" && regex.test(ID)) {
      const index = req.fakeData.findIndex((fakeData) => {
        return fakeData.id == ID;
      });

      if (index == -1) {
        res.statusCode = 400;
        res.write(
          JSON.stringify({ title: "Not Found", message: "Data not found" })
        );
        res.end();
      } else {
        req.fakeData.splice(index, 1);
        writeToData(req.fakeData);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.fakeData));
      }
    } else {
      res.statusCode = 400;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Data not found" })
      );
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({ title: "Not Found", message: "route not found" })
    );
    res.end();
  }
};

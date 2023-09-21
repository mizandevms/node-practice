const writeToData = require("../utilies/write-to-file");
const requestBodyParser = require("../utilies/body-parser");
const writeToFile = require("../utilies/write-to-file");

module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let ID = req.url.split("/")[3];

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
      try {
        let body = await requestBodyParser(req);

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
          req.fakeData[index] = {
            ID,
            ...body,
          };
          writeToFile(req.fakeData);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(req.fakeData[index]));
        }
      } catch (error) {
        console.log(error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            title: "Validation Failed",
            message: "Request body is not valid",
          })
        );
      }
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

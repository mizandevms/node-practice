const crypto = require("crypto");
const requestBodyParser = require("../utilies/body-parser");
const writeToData = require("../utilies/write-to-file");

module.exports = async (req, res) => {
  // console.log(req.url);
  if (req.url === "/api/videos") {
    try {
      let body = await requestBodyParser(req);
      console.log("Request Body: ", body);

      body.id = req.fakeData.length + 1;
      req.fakeData.push(body);
      writeToData(req.fakeData);
      res.statusCode = 200;
      res.write(
        JSON.stringify({
          title: "data added",
          message: "Data added succesfully",
        })
      );
      res.end();
    } catch (error) {
      // console.log(error);
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          title: "auth error",
          message: "authentication error",
        })
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

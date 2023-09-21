const http = require("http");
// require("dotenv").config();
const PORT = process.env.PORT || 5001;

const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let fakeData = require("./data/fakeData.json");

const server = http.createServer((req, res) => {
  // console.log(req.method)
  req.fakeData = fakeData;

  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "route not found" })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

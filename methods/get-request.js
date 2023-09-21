module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  //   console.log(baseUrl);
  let ID = req.url.split("/")[3];
  //   console.log(ID);

  const regex = new RegExp(/^[1-9]\d*$/);

  if (req.url === "/api/videos") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.fakeData));
    res.end();
  } else if (!regex.test(ID)) {
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
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    let filterData = req.fakeData.filter((item) => {
      return item.id == ID;
    });
    // console.log(filterData); 

    if (baseUrl === "/api/videos/" && filterData.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filterData));
      res.end();
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

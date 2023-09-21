module.exports = async (request) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        // console.log(body);
        resolve(JSON.parse(body));
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

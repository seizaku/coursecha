const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () =>
  console.log(`
  🚀 Server ready at: http://localhost:${port}`)
);

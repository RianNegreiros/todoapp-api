"use strict";

var _app = require("./app");

const server = _app.app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));

process.on('SIGINT', () => {
  server.close();
  console.log('Express server closed.');
});
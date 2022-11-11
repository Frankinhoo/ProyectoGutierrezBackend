"use strict";

var server = require('./services/server');
var _require = require('./services/socket'),
  initWsServer = _require.initWsServer,
  getWsServer = _require.getWsServer;
var PORT = 8080;
server.listen(PORT, function () {
  console.log("Servidor http escuchando en el puerto ".concat(PORT));
});
server.on('error', function (error) {
  return console.log("Error en el servidor ".concat(error));
});
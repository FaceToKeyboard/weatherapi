const server = require('./server.js');
const port = process.env.SERVER_PORT || 3000;

server.listen(port, () => {
  console.log(`${new Date().toLocaleString()}: Server started on port ${port}`);
})
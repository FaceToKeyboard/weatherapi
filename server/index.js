import { server } from './server.js';
const port = process.env.SERVER_PORT;

server.listen(port, () => {
  console.log('Server started on port ', port);
})
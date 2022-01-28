import express from 'express';
export const server = express();

server.get('/local', (req, res) => {
  res.send('Hello world!');
});

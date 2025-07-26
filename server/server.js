import http from 'http';
import app from './app.js';

const server = http.createServer(app)
const port = process.env.PORT || 2000;


server.listen(port, ()=>{
  console.log(`Server is running on port: ${port}`)
})
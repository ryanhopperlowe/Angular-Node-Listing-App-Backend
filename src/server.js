import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi'
import { db } from './database';
import routes from './routes';
import * as admin from 'firebase-admin';
import credentials from '../firebase-credentials.json';
import inert from '@hapi/inert';

admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

let server;

const start = async () => {
  server = Hapi.server({
    port: 8080,
    host: '0.0.0.0'
  });

  await server.register(inert);

  routes.forEach((route) => server.route(route));

  db.connect();

  await server.start();
  console.log(`Server is listening on ${server.info.uri}`);
}

process.on('unhandledRejection', (error) => {
  console.log(error);
  db.end();
  process.exit(1);
})

process.on('SIGINT', async () => {
  console.log('Stopping Server...');
  await server.stop({ timeout: 10000 });
  db.end();
  console.log('Server Stopped');
  process.exit(0);
})

start();
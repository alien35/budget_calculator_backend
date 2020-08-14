import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import handlePing from './handlePing';
import handleUserDetails from './handleUserDetails';
import handleUpdateUserDetails from './handleUpdateUserDetails';
import handleItems from './handleItems';

const admin = require('firebase-admin');
admin.initializeApp();


const v1 = express();
v1.use(cors({ origin: true }));
v1.post('/ping', async (req: any, res: any) => {
  await handlePing(req, res);
})
v1.get('/user', async (req: any, res: any) => {
  await handleUserDetails(req, res);
})
v1.post('/user', async (req: any, res: any) => {
  await handleUpdateUserDetails(req, res);
})
v1.get('/items', async (req: any, res: any) => {
  await handleItems(req, res);
})

type runTimeOptsType = {
  timeoutSeconds: number,
  memory: '512MB' | '256MB' | '1GB'
}

const runtimeOpts: runTimeOptsType = {
  timeoutSeconds: 30,
  memory: '512MB'
}

exports.v1 = functions
  .runWith(runtimeOpts)
  .https.onRequest(v1);

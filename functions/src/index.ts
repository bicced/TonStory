import * as admin from 'firebase-admin';
const serviceAccount = require('../credentials/service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import { updateLevel, updatePoints } from './player';
import { getScoreboard } from './scoreboard';
import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import { auth } from './middleware';
import { loadUserData } from './users';
import { telegramBotUpdate } from './telegram';


const express = require('express');
const app = express();

//update in production
const cors = require('cors')({origin: true});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors);

// Define routes
app.get('/user-data', [auth], loadUserData);
app.post('/update-points', [auth], updatePoints);
app.post('/update-level', [auth], updateLevel);
app.get('/scoreboard', [auth], getScoreboard);
app.get('/test', (req: Request, res: Response) => res.send('OK'));

app.post('/telegram-bot-update', [auth], telegramBotUpdate);


export const api = functions.runWith({
  memory: '512MB'
}).https.onRequest(app);

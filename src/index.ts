import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';

import { AppModule } from './app.module';

const expressServer = express();

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  await app.init();
};

createFunction(expressServer)
  .then(() => console.log('Nest is ready'))
  .catch(err => console.error('Something went wrong', err));

export const api = functions.region('europe-west1')
  .https.onRequest(expressServer);

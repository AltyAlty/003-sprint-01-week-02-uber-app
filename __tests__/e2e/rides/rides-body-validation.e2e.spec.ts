import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { clearDb } from '../../utils/clear-db';
import { Currency } from '../../../src/rides/types/ride';
import { RIDES_PATH } from '../../../src/core/paths/path';

describe('Rides API body validation check', () => {
  const app = express();
  setupApp(app);
  const adminToken = generateBasicAuthToken();
  beforeAll(async () => await clearDb(app));

  it(`❌ should not create a ride when incorrect body passed; POST /api/rides'`, async () => {
    await request(app).post(RIDES_PATH).send({}).expect(HttpStatus.Unauthorized);

    const invalidDataSet1 = await request(app)
      .post(RIDES_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        clientName: '   ',
        price: 'bla bla',
        currency: 1,
        fromAddress: '',
        toAddress: true,
        driverId: 'bam',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(6);

    const invalidDataSet2 = await request(app)
      .post(RIDES_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        clientName: 'LA',
        price: 0,
        currency: 'byn',
        fromAddress: 'street',
        driverId: 0,
        toAddress: 'test address',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(5);

    const invalidDataSet3 = await request(app)
      .post(RIDES_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        driverId: 5000,
        clientName: 'Sam',
        price: 100,
        currency: Currency.USD,
        fromAddress: 'test address',
        toAddress: 'test address',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);
    const riderListResponse = await request(app).get(RIDES_PATH).set('Authorization', adminToken);
    expect(riderListResponse.body).toHaveLength(0);
  });
});

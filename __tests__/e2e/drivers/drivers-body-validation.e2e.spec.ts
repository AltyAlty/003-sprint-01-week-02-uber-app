import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { VehicleFeature } from '../../../src/drivers/types/driver';
import { DriverInputDto } from '../../../src/drivers/dto/driver.input-dto';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { DRIVERS_PATH } from '../../../src/core/paths/path';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { clearDb } from '../../utils/clear-db';
import { getDriverDto } from '../../utils/drivers/get-driver-dto';
import { createDriver } from '../../utils/drivers/create-driver';
import { getDriverById } from '../../utils/drivers/get-driver-by-id';

describe('Drivers API body validation check', () => {
  const app = express();
  setupApp(app);
  const adminToken = generateBasicAuthToken();
  const correctTestDriverData: DriverInputDto = getDriverDto();
  beforeAll(async () => await clearDb(app));

  /*Описываем тест, проверяющий отказ в добавлении водителя с непрошедшими валидацию данными.*/
  it('❌ should not create a driver when incorrect body passed; POST /api/drivers', async () => {
    await request(app).post(DRIVERS_PATH).send(correctTestDriverData).expect(HttpStatus.Unauthorized);

    const invalidDataSet1 = await request(app)
      .post(DRIVERS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...correctTestDriverData,
        name: '   ',
        phoneNumber: '    ',
        email: 'invalid email',
        vehicleMake: '',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .post(DRIVERS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...correctTestDriverData,
        phoneNumber: '',
        vehicleModel: '',
        vehicleYear: 'year',
        vehicleLicensePlate: '',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .post(DRIVERS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...correctTestDriverData,
        name: 'A',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);
    const driverListResponse = await request(app).get(DRIVERS_PATH).set('Authorization', adminToken);
    expect(driverListResponse.body).toHaveLength(0);
  });

  /*Описываем тест, проверяющий отказ в изменении данных водителя с непрошедшими валидацию данными.*/
  it('❌ should not update a driver when incorrect body passed; PUT /api/drivers/:id', async () => {
    const createdDriver = await createDriver(app, correctTestDriverData);

    const invalidDataSet1 = await request(app)
      .put(`${DRIVERS_PATH}/${createdDriver.id}`)
      .set('Authorization', adminToken)
      .send({
        ...correctTestDriverData,
        name: '   ',
        phoneNumber: '    ',
        email: 'invalid email',
        vehicleMake: '',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .put(`${DRIVERS_PATH}/${createdDriver.id}`)
      .set('Authorization', adminToken)
      .send({
        ...correctTestDriverData,
        phoneNumber: '',
        vehicleModel: '',
        vehicleYear: 'year',
        vehicleLicensePlate: '',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .put(`${DRIVERS_PATH}/${createdDriver.id}`)
      .set('Authorization', adminToken)
      .send({
        ...correctTestDriverData,
        name: 'A',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);
    const driverResponse = await getDriverById(app, createdDriver.id);

    expect(driverResponse).toEqual({
      ...correctTestDriverData,
      id: createdDriver.id,
      createdAt: expect.any(String),
    });
  });

  /*Описываем тест, проверяющий отказ в изменении данных водителя с непрошедшими валидацию данными о фичах машины.*/
  it('❌ should not update a driver when incorrect features passed; PUT /api/drivers/:id', async () => {
    const createdDriver = await createDriver(app, correctTestDriverData);

    await request(app)
      .put(`${DRIVERS_PATH}/${createdDriver.id}`)
      .set('Authorization', adminToken)
      .send({
        ...correctTestDriverData,
        vehicleFeatures: [VehicleFeature.ChildSeat, 'invalid-feature', VehicleFeature.WiFi],
      })
      .expect(HttpStatus.BadRequest);

    const driverResponse = await getDriverById(app, createdDriver.id);

    expect(driverResponse).toEqual({
      ...correctTestDriverData,
      id: createdDriver.id,
      createdAt: expect.any(String),
    });
  });
});

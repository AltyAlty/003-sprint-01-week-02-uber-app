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
import { updateDriver } from '../../utils/drivers/update-driver';

/*Описываем тестовый набор.*/
describe('Drivers API', () => {
  /*Создание экземпляра приложения Express.*/
  const app = express();
  /*Настраиваем экземпляр приложения Express при помощи функции "setupApp()".*/
  setupApp(app);
  /*Генерируем токен для Basic авторизации.*/
  const adminToken = generateBasicAuthToken();
  /*Перед запуском тестов, очищаем БД с данными по водителям.*/
  beforeAll(async () => await clearDb(app));

  /*Описываем тест, проверяющий добавление нового водителя в БД.*/
  it('✅ should create a driver; POST /api/drivers', async () => {
    const newDriver: DriverInputDto = {
      ...getDriverDto(),
      name: 'Feodor',
      email: 'feodor@example.com',
    };

    await createDriver(app, newDriver);
  });

  /*Описываем тест, проверяющий получение данных по всем водителями из БД.*/
  it('✅ should return a list of drivers; GET /api/drivers', async () => {
    await createDriver(app);
    await createDriver(app);

    const driverListResponse = await request(app)
      .get(DRIVERS_PATH)
      .set('Authorization', adminToken)
      .expect(HttpStatus.Ok);

    expect(driverListResponse.body).toBeInstanceOf(Array);
    expect(driverListResponse.body.length).toBeGreaterThanOrEqual(2);
  });

  /*Описываем тест, проверяющий получение данных по водителю по id из БД.*/
  it('✅ should return a driver by id; GET /api/drivers/:id', async () => {
    const createdDriver = await createDriver(app);
    const driver = await getDriverById(app, createdDriver.id);

    expect(driver).toEqual({
      ...createdDriver,
      id: expect.any(Number),
      createdAt: expect.any(String),
    });
  });

  /*Описываем тест, проверяющий изменение данных по водителю по id в БД.*/
  it('✅ should update a driver; PUT /api/drivers/:id', async () => {
    const createdDriver = await createDriver(app);

    const driverUpdateData: DriverInputDto = {
      name: 'Updated Name',
      phoneNumber: '999-888-7777',
      email: 'updated@example.com',
      vehicleMake: 'Tesla',
      vehicleModel: 'Model S',
      vehicleYear: 2022,
      vehicleLicensePlate: 'NEW-789',
      vehicleDescription: 'Updated vehicle description',
      vehicleFeatures: [VehicleFeature.ChildSeat],
    };

    await updateDriver(app, createdDriver.id, driverUpdateData);
    const driverResponse = await getDriverById(app, createdDriver.id);

    expect(driverResponse).toEqual({
      ...driverUpdateData,
      id: createdDriver.id,
      createdAt: expect.any(String),
    });
  });

  /*Описываем тест, проверяющий удаление водителя по id в БД.*/
  it('✅ should delete a driver by id; DELETE /api/drivers/:id', async () => {
    const createdDriver = await createDriver(app);

    await request(app)
      .delete(`${DRIVERS_PATH}/${createdDriver.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatus.NoContent);

    const driverResponse = await request(app)
      .get(`${DRIVERS_PATH}/${createdDriver.id}`)
      .set('Authorization', adminToken);

    expect(driverResponse.status).toBe(HttpStatus.NotFound);
  });
});
